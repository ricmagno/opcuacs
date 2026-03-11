# ADR 002: Technology Stack (Rust, Kubernetes, Web UI)

## Status
Accepted

## Date
2026-03-11

## Context
The project requires a fast and lightweight OPC UA Client/Server capable of running in containerized environments (Kubernetes). Additionally, a user-friendly way to manage connections is needed via a web interface.

## Decision
We will use the following technology stack:
- **Backend**: Rust, for its performance, safety, and low resource footprint.
- **OPC UA Implementation**: A high-performance Rust crate (e.g., based on open62541 or a pure Rust implementation).
- **Deployment**: Docker containers orchestrated by Kubernetes.
- **Frontend**: A web-based UIX Explorer (e.g., React or Vite) to manage servers/clients.

## Rationale
- Rust provides the necessary speed and lightness compared to other managed languages.
- Kubernetes ensures scalability and resilience.
- A web interface provides cross-platform management without local software dependencies.

## Consequences
- **Positive**: High performance, easy orchestration, modern UI.
- **Negative**: Steeper learning curve for Rust; complexity of K8s management.
