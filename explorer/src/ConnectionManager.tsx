import { useEffect, useState } from "react";

export interface Connection {
  id: string;
  name: string;
  endpoint: string;
  active: boolean;
}

export function ConnectionManager() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [newConn, setNewConn] = useState<Partial<Connection>>({
    name: "",
    endpoint: "opc.tcp://",
    active: true,
  });
  const [loading, setLoading] = useState(false);

  const fetchConnections = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/connections");
      const data = await response.json();
      setConnections(data);
    } catch (err) {
      console.error("Failed to fetch connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConn.name || !newConn.endpoint) return;
    
    setLoading(true);
    const conn: Connection = {
      id: Math.random().toString(36).substr(2, 9),
      name: newConn.name,
      endpoint: newConn.endpoint,
      active: true,
      ...newConn,
    };

    try {
      await fetch("http://localhost:3000/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conn),
      });
      setNewConn({ name: "", endpoint: "opc.tcp://", active: true });
      fetchConnections();
    } catch (err) {
      alert("Failed to add connection");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this connection?")) return;
    try {
      await fetch(`http://localhost:3000/api/connections/${id}`, {
        method: "DELETE",
      });
      fetchConnections();
    } catch (err) {
      alert("Failed to delete connection");
    }
  };

  const toggleActive = async (conn: Connection) => {
    try {
      await fetch("http://localhost:3000/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...conn, active: !conn.active }),
      });
      fetchConnections();
    } catch (err) {
      alert("Failed to update connection");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Connection Management</h2>
      
      <form onSubmit={handleAdd} style={{ 
        display: "grid", 
        gap: "10px", 
        marginBottom: "30px",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Connection Name (e.g. PLC 1)"
            value={newConn.name}
            onChange={(e) => setNewConn({ ...newConn, name: e.target.value })}
            style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #333", background: "#1a1a1a", color: "white" }}
          />
          <input
            type="text"
            placeholder="opc.tcp://..."
            value={newConn.endpoint}
            onChange={(e) => setNewConn({ ...newConn, endpoint: e.target.value })}
            style={{ flex: 2, padding: "10px", borderRadius: "6px", border: "1px solid #333", background: "#1a1a1a", color: "white" }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: "10px 20px", 
              borderRadius: "6px", 
              background: "#646cff", 
              color: "white", 
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "Adding..." : "Add Server"}
          </button>
        </div>
      </form>

      <div style={{ display: "grid", gap: "15px" }}>
        {connections.map((conn) => (
          <div
            key={conn.id}
            style={{
              padding: "15px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${conn.active ? "rgba(100, 108, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>{conn.name}</div>
              <div style={{ fontSize: "0.85em", color: "#888", fontFamily: "monospace" }}>{conn.endpoint}</div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => toggleActive(conn)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: conn.active ? "#2ecc71" : "#95a5a6",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85em"
                }}
              >
                {conn.active ? "Active" : "Disabled"}
              </button>
              <button
                onClick={() => handleDelete(conn.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "#e74c3c",
                  border: "1px solid #e74c3c",
                  cursor: "pointer",
                  fontSize: "0.85em"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
