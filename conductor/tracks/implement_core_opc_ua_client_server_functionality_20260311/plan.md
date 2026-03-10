# Plan: Implement Core OPC UA Client and Server Functionality

This plan outlines the steps to implement the core OPC UA Client and Server functionality in Python, as defined in `spec.md`.

## Phase 1: OPC UA Client Core

- [ ] Task: Set up Python project structure and environment
    - [ ] Set up a new Python project using Poetry or pipenv.
    - [ ] Initialize a Git repository (if not already done).
    - [ ] Create basic directory structure (e.g., `src/`, `tests/`, `docs/`).
    - [ ] Configure `pyproject.toml` or `Pipfile` with initial dependencies (e.g., `python-opcua`, `pytest`).
- [ ] Task: Implement OPC UA Client connection management
    - [ ] Write tests for client connection and disconnection.
    - [ ] Implement `OpcUaClient` class with methods for `connect(url)` and `disconnect()`.
    - [ ] Ensure secure connection handling (basic, no advanced certificates yet).
- [ ] Task: Implement OPC UA Client address space browsing
    - [ ] Write tests for browsing the server address space.
    - [ ] Implement a method to browse nodes, returning their display names and NodeIds.
- [ ] Task: Implement OPC UA Client basic data reading
    - [ ] Write tests for reading scalar node values.
    - [ ] Implement a method to read a single node's value by NodeId.
    - [ ] Support common data types (Int32, Float, Boolean, String).
- [ ] Task: Implement OPC UA Client basic data writing
    - [ ] Write tests for writing scalar node values.
    - [ ] Implement a method to write a single node's value by NodeId.
    - [ ] Support common data types (Int32, Float, Boolean, String).
- [ ] Task: Conductor - User Manual Verification 'OPC UA Client Core' (Protocol in workflow.md)

## Phase 2: OPC UA Server Core

- [ ] Task: Implement OPC UA Server initialization and shutdown
    - [ ] Write tests for server startup and graceful shutdown.
    - [ ] Implement `OpcUaServer` class with methods for `start(endpoint_url)` and `stop()`.
    - [ ] Configure a minimal server with an endpoint URL.
- [ ] Task: Implement OPC UA Server address space creation
    - [ ] Write tests for creating and managing nodes in the address space.
    - [ ] Implement methods to add standard objects and custom variables to the server's address space.
- [ ] Task: Implement OPC UA Server client connection handling
    - [ ] Write tests for accepting and managing multiple client connections.
    - [ ] Ensure basic session management.
- [ ] Task: Implement OPC UA Server data access handling (read requests)
    - [ ] Write tests for handling client read requests for server nodes.
    - [ ] Implement mechanisms for the server to respond to read requests.
- [ ] Task: Implement OPC UA Server data access handling (write requests)
    - [ ] Write tests for handling client write requests for server nodes.
    - [ ] Implement mechanisms for the server to update internal values based on client write requests.
- [ ] Task: Conductor - User Manual Verification 'OPC UA Server Core' (Protocol in workflow.md)

## Phase 3: Client-Server Interaction & Subscriptions

- [ ] Task: Implement OPC UA Client subscriptions
    - [ ] Write tests for client subscriptions to data changes.
    - [ ] Implement client-side logic to create a subscription and receive data change notifications.
- [ ] Task: Implement OPC UA Server subscription management
    - [ ] Write tests for server-side subscription management.
    - [ ] Implement server-side logic to track subscriptions and send data change notifications to clients.
- [ ] Task: End-to-end client-server integration test
    - [ ] Write a comprehensive integration test connecting client and server.
    - [ ] Verify browsing, read/write, and subscriptions work correctly between them.
- [ ] Task: Conductor - User Manual Verification 'Client-Server Interaction & Subscriptions' (Protocol in workflow.md)
