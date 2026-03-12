import { useEffect, useState } from "react";

interface Tag {
  connection_id: string;
  name: string;
  value: string;
  timestamp: string;
}

export function TagViewer() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tags");
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        setTags(data);
        setError(null);
      } catch (err) {
        setError("Backend is unreachable. Make sure the Rust engine is running.");
      }
    };

    const interval = setInterval(fetchTags, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
      <div style={{ display: "grid", gap: "15px" }}>
        {tags.length === 0 && !error && <p style={{ color: "#888" }}>No active connections or waiting for data...</p>}
        {tags.map((tag, idx) => (
          <div
            key={`${tag.connection_id}-${tag.name}-${idx}`}
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.75em", color: "#646cff", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                Connection: {tag.connection_id}
              </div>
              <strong style={{ fontSize: "1.2em", display: "block", marginTop: "4px" }}>{tag.name}</strong>
              <div style={{ fontSize: "0.8em", color: "#666", marginTop: "4px" }}>
                ID: Server/ServerStatus/CurrentTime
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.4em", fontWeight: "700", fontFamily: "JetBrains Mono, monospace", color: "#fff" }}>
                {tag.value.replace(/Body "(.*)"/, "$1").split('"')[1] || tag.value}
              </div>
              <div style={{ fontSize: "0.7em", color: "#555", marginTop: "6px" }}>
                Last sync: {new Date(tag.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p style={{ color: "#ff4d4d", marginTop: "20px" }}>{error}</p>}
    </div>
  );
}
