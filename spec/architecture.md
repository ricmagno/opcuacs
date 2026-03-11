# System Architecture

## Overview
OPCUACS is split into a high-performance Rust backend handling OPC UA protocols and a web-based frontend for management.

## Components

### 1. Rust Backend (The Engine)
- **OPC UA Client Module**: Connects to external PLCs/Servers.
- **OPC UA Server Module**: Exposes internal tags to SCADA/Matlab.
- **API Layer**: Provides endpoints for the UIX Explorer.

### 2. Web UI (UIX Explorer)
- Manages connection configurations.
- Monitors real-time tag status.
- Configures server security and settings.

### 3. Deployment Layer
- **Containerization**: Dockerfile for the Rust binary.
- **Orchestration**: Kubernetes manifests (Deployments, Services, ConfigMaps).

## Data Flow
1. UIX Explorer sends configuration to Rust Backend via REST/WebSockets.
2. Rust Backend establishes connections to PLCs.
3. Data is proxied to the Server module or exposed via API.
