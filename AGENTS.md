# AGENTS.md

This document serves as the authoritative guide for AI agents working on the OPCUACS project. It defines the technical standards, conventions, and architectural patterns for the Rust-based implementation.

## Technical Stack

- **Language**: Rust (Stable)
- **OPC UA Library**: [Open62541-rust or similar high-performance crate]
- **Web UI**: [React/Vite or similar for the explorer]
- **Orchestration**: Kubernetes

## Coding Standards

### Rust Conventions
- Follow standard `rustfmt` guidelines.
- Use `PascalCase` for types and traits.
- Use `snake_case` for functions, variables, and modules.
- Prefer explicit error handling with `Result` and `Option`.
- Documentation: Use `///` for doc comments on public items.

### Performance & Safety
- Minimize usage of `unsafe` blocks.
- Prioritize memory efficiency and fast startup times for containerized environments.

## Architectural Patterns

- **Asynchronous I/O**: Use `tokio` for handling multiple OPC UA connections.
- **Microservices**: Containerized architecture suitable for Kubernetes.
- **API First**: Clear separation between the Rust backend (OPC UA logic) and the Web UI.

## Workflow for AI Agents

1. **Research**: Understand the current state of the codebase. Read `memory/MEMORY.md` first.
2. **Plan**: Create or update an implementation plan.
3. **Execute**: Implement changes according to the plan.
4. **Verify**: Test and validate changes.
5. **Update Memory**: Record significant decisions or learned behaviors in `memory/`.

## Memory System

All AI agents share a persistent memory system in the `memory/` directory:
- [`memory/MEMORY.md`](memory/MEMORY.md) — Concise index (read this first every session)
- [`memory/decisions.md`](memory/decisions.md) — Architectural decisions and rationale
- [`memory/environment.md`](memory/environment.md) — Environment setup notes and gotchas
- [`memory/conventions.md`](memory/conventions.md) — Coding conventions and patterns

**Rule**: When you learn something new about the project (a gotcha, a pattern, a decision), update the relevant topic file in `memory/`. If no topic file fits, create a new one and add it to the index.
