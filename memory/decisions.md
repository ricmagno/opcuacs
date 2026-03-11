# Architectural Decisions

## 2026-03-11: Technology Pivot from C# to Rust
- **Context**: Project requires fast, lightweight OPC UA connectivity in Kubernetes.
- **Decision**: Use Rust for performance, memory safety, and small container footprint.
- **ADR**: [ADR 002 — Technology Stack](../adr/002-technology-stack.md)

## 2026-03-11: AI-Optimized Documentation Structure
- **Context**: Multiple AI agents will work on this project and need consistent guidance.
- **Decision**: Use `AGENTS.md`, `memory/`, `conductor/`, and ADRs as the documentation layer.
- **ADR**: [ADR 001 — AI-Optimized Documentation](../adr/001-ai-optimized-documentation.md)

## 2026-03-11: Conductor Workflow Adoption
- **Context**: Need a structured, auditable workflow for task management.
- **Decision**: Adopt the Conductor system with `plan.md`, tracks, and phased checkpoints.
