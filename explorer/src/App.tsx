import { useState } from "react";
import "./App.css";
import { TagViewer } from "./TagViewer";
import { ConnectionManager } from "./ConnectionManager";

import { ServerInfo } from "./ServerInfo";

function App() {
  const [view, setView] = useState<"dashboard" | "connections">("dashboard");

  return (
    <div className="app-container">
      <header style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "2.5em", letterSpacing: "-1px" }}>
          OPCUACS Explorer
        </h1>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => setView("dashboard")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: view === "dashboard" ? "#646cff" : "rgba(255, 255, 255, 0.05)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.2s"
            }}
          >
            Live Dashboard
          </button>
          <button
            onClick={() => setView("connections")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: view === "connections" ? "#646cff" : "rgba(255, 255, 255, 0.05)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.2s"
            }}
          >
            Connections
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto" }}>
        {view === "dashboard" ? (
          <>
            <ServerInfo />
            <TagViewer />
          </>
        ) : (
          <ConnectionManager />
        )}
      </main>

      <footer style={{ marginTop: "100px", padding: "20px", textAlign: "center", color: "#444", fontSize: "0.8em" }}>
        v0.1.0-alpha • Rust + React + Kubernetes
      </footer>
    </div>
  );
}

export default App;
