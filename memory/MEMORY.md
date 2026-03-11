# MEMORY.md — Project Memory Index

This is the concise index loaded into every AI agent session. It links to detailed topic files in this directory.

## Project Overview
- **Name**: OPCUACS — High-performance OPC UA Client & Server
- **Stack**: Rust (backend), React/Vite (frontend), Kubernetes (orchestration)
- **Workflow**: Conductor system (`conductor/`)

## Current Status
- **Active Track**: [Setup CI/CD Pipeline](../conductor/tracks.md)
- **Rust Environment**: `cargo`/`rustc` NOT available on this machine yet — install before engine work.
- **Frontend**: Initialized in `explorer/` (React + TypeScript + Vite).

## Topic Files
- [decisions.md](decisions.md) — Architectural decisions and rationale
- [environment.md](environment.md) — Environment setup notes and gotchas
- [conventions.md](conventions.md) — Coding conventions and patterns

## Quick Rules
- Always follow `AGENTS.md` for coding standards.
- Always follow `conductor/workflow.md` for task lifecycle.
- Update this memory directory when learning something new about the project.
- Use `plan.md` as the source of truth for task tracking.
