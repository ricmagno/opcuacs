use anyhow::{Context, Result};
use axum::{
    extract::{Path, State},
    routing::{delete, get, post},
    Json, Router,
};
use open62541::{ua, AsyncClient, Server, Attributes};
use serde::{Deserialize, Serialize};
use std::fs;
use std::sync::{Arc, RwLock};
use std::time::Duration;
use tokio::time::sleep;
use tower_http::cors::CorsLayer;

#[derive(Serialize, Deserialize, Clone, Debug)]
struct ConnectionConfig {
    id: String,
    name: String,
    endpoint: String,
    active: bool,
}

#[derive(Serialize, Clone, Debug)]
struct TagValue {
    connection_id: String,
    name: String,
    value: String,
    timestamp: String,
}

struct AppState {
    connections: RwLock<Vec<ConnectionConfig>>,
    tags: RwLock<Vec<TagValue>>,
    server: Arc<Server>, // Shared server instance
}

const CONFIG_FILE: &str = "config.json";

#[tokio::main]
async fn main() -> Result<()> {
    println!("OPCUACS Engine starting...");

    let initial_connections = load_config()?;
    
    // Initialize OPC UA Server
    let (server, runner) = Server::new();
    let server = Arc::new(server);

    let state = Arc::new(AppState {
        connections: RwLock::new(initial_connections),
        tags: RwLock::new(Vec::new()),
        server: Arc::clone(&server),
    });

    // Run OPC UA Server in a dedicated thread
    tokio::task::spawn_blocking(move || {
        println!("OPC UA Server listening on opc.tcp://0.0.0.0:4840");
        if let Err(e) = runner.run() {
            eprintln!("OPC UA Server error: {:?}", e);
        }
    });

    // Start background monitor manager
    let monitor_state = Arc::clone(&state);
    tokio::spawn(async move {
        run_monitor_manager(monitor_state).await;
    });

    // API Router
    let app = Router::new()
        .route("/api/tags", get(get_tags))
        .route("/api/connections", get(get_connections))
        .route("/api/connections", post(add_connection))
        .route("/api/connections/:id", delete(delete_connection))
        .route("/api/server", get(get_server_info))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    println!("Web API Server listening on http://0.0.0.0:3000");

    axum::serve(listener, app).await?;

    Ok(())
}

// --- API Handlers ---

async fn get_tags(State(state): State<Arc<AppState>>) -> Json<Vec<TagValue>> {
    let tags = state.tags.read().unwrap().clone();
    Json(tags)
}

async fn get_connections(State(state): State<Arc<AppState>>) -> Json<Vec<ConnectionConfig>> {
    let conns = state.connections.read().unwrap().clone();
    Json(conns)
}

async fn add_connection(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<ConnectionConfig>,
) -> Json<ConnectionConfig> {
    let mut conns = state.connections.write().unwrap();
    if let Some(existing) = conns.iter_mut().find(|c| c.id == payload.id) {
        *existing = payload.clone();
    } else {
        conns.push(payload.clone());
    }
    let _ = save_config(&conns);
    Json(payload)
}

async fn delete_connection(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Json<bool> {
    let mut conns = state.connections.write().unwrap();
    let initial_len = conns.len();
    conns.retain(|c| c.id != id);
    let deleted = conns.len() < initial_len;
    if deleted {
        let _ = save_config(&conns);
    }
    Json(deleted)
}

#[derive(Serialize)]
struct ServerInfo {
    endpoint: String,
    status: String,
    monitored_tags: usize,
}

async fn get_server_info(State(state): State<Arc<AppState>>) -> Json<ServerInfo> {
    let tags_count = state.tags.read().unwrap().len();
    Json(ServerInfo {
        endpoint: "opc.tcp://0.0.0.0:4840".to_string(),
        status: "Running".to_string(),
        monitored_tags: tags_count,
    })
}

// --- Background Logic ---

async fn run_monitor_manager(state: Arc<AppState>) {
    loop {
        let connections = {
            let conns = state.connections.read().unwrap();
            conns.clone()
        };
        
        for conn in connections.into_iter().filter(|c| c.active) {
            let state_clone = Arc::clone(&state);
            tokio::spawn(async move {
                if let Err(e) = poll_connection(state_clone, conn).await {
                    eprintln!("Poll error: {:?}", e);
                }
            });
        }
        sleep(Duration::from_secs(2)).await;
    }
}

async fn poll_connection(state: Arc<AppState>, config: ConnectionConfig) -> Result<()> {
    let client = AsyncClient::new(&config.endpoint)
        .with_context(|| format!("Failed to connect to {}", config.endpoint))?;

    let node_id = ua::NodeId::numeric(0, 2258); // Server/ServerStatus/CurrentTime
    if let Ok(dv) = client.read_value(&node_id).await {
        let val_str = format!("{:?}", dv.value());
        let now = chrono::Utc::now().to_rfc3339();

        // Update internal state
        {
            let mut tags = state.tags.write().unwrap();
            tags.retain(|t| t.connection_id != config.id);
            tags.push(TagValue {
                connection_id: config.id.clone(),
                name: "ServerTime".to_string(),
                value: val_str.clone(),
                timestamp: now,
            });
        }

        // Mirror to local OPC UA Server
        // We Use a simple naming convention for mirrored nodes: (1, "conn_id.ServerTime")
        let server_node_id = ua::NodeId::string(1, &format!("{}.ServerTime", config.id));
        
        let var = open62541::VariableNode {
            requested_new_node_id: Some(server_node_id.clone()),
            parent_node_id: ua::NodeId::numeric(0, 85), // Objects folder
            reference_type_id: ua::NodeId::numeric(0, 35), // Organizes
            browse_name: ua::QualifiedName::new(1, &format!("{}.ServerTime", config.id)),
            type_definition: ua::NodeId::numeric(0, 63), // BaseDataVariableType
            attributes: ua::VariableAttributes::default()
                .with_display_name(&ua::LocalizedText::new("en-US", &format!("{} - ServerTime", config.name)).expect("Valid display name")),
        };

        // Ensure node exists in our server. If not, add it.
        // open62541-rust handles node addition/updates. 
        // For simplicity in this UIX preview, we'll try to add it every time, ignoring errors
        let _ = state.server.add_variable_node(var);

        // Update value if it already exists
        let _ = state.server.write_value(&server_node_id, &dv.value());
    }
    Ok(())
}

// --- Persistence ---

fn load_config() -> Result<Vec<ConnectionConfig>> {
    if !fs::metadata(CONFIG_FILE).is_ok() {
        return Ok(vec![ConnectionConfig {
            id: "default".to_string(),
            name: "Prosys Public".to_string(),
            endpoint: "opc.tcp://opcuaserver.com:48010".to_string(),
            active: true,
        }]);
    }
    let content = fs::read_to_string(CONFIG_FILE)?;
    let conns = serde_json::from_str(&content)?;
    Ok(conns)
}

fn save_config(conns: &[ConnectionConfig]) -> Result<()> {
    let content = serde_json::to_string_pretty(conns)?;
    fs::write(CONFIG_FILE, content)?;
    Ok(())
}
