# Technology Stack: OPCUACS

## Backend (The Engine)
- **Rust (Stable)**: Primary language for its performance, memory safety, and low resource footprint.
- **Tokio**: Asynchronous runtime for handling multiple high-performance OPC UA connections.
- **open62541-rust**: High-performance Rust wrapper for the open62541 OPC UA implementation.

## Frontend (UIX Explorer)
- **React**: Modern component-based library for building the web interface.
- **Vite**: Fast development tool and bundler for the web UI.

## Infrastructure & Orchestration
- **Docker**: Containerization for consistent deployment across environments.
- **Kubernetes**: Orchestration for scaling, resilience, and management of the OPC UA client and server nodes.

## Communication Patterns
- **API First**: RESTful and WebSocket-based communication between the Rust backend and the web frontend.
- **Direct OPC UA**: Native communication with industrial PLCs and SCADA systems using the OPC UA protocol.
