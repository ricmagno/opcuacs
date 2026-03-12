import { useEffect, useState } from "react";

interface ServerData {
  endpoint: string;
  status: string;
  monitored_tags: number;
}

export function ServerInfo() {
  const [data, setData] = useState<ServerData | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/server");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch server info", err);
      }
    };
    fetchInfo();
    const interval = setInterval(fetchInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <div style={{ 
      padding: "20px", 
      background: "rgba(100, 108, 255, 0.05)", 
      border: "1px solid rgba(100, 108, 255, 0.2)",
      borderRadius: "16px",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      backdropFilter: "blur(10px)"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.8em", color: "#888", textTransform: "uppercase" }}>Gateway Protocol</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em", color: "#646cff" }}>OPC UA (TCP)</div>
      </div>
      <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.8em", color: "#888", textTransform: "uppercase" }}>Local Endpoint</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em", fontFamily: "monospace" }}>{data.endpoint}</div>
      </div>
      <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.8em", color: "#888", textTransform: "uppercase" }}>Status</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em", color: "#2ecc71" }}>● {data.status}</div>
      </div>
      <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.8em", color: "#888", textTransform: "uppercase" }}>Exposed Nodes</div>
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>{data.monitored_tags}</div>
      </div>
    </div>
  );
}
