# ADR 001: AI-Optimized Documentation Structure

## Status
Accepted

## Date
2026-03-11

## Context
There is a need to establish a consistent and informative documentation structure that is optimized for AI coding agents to enhance their effectiveness and maintain project consistency.

## Decision
We will use a specific set of markdown files and directories to guide AI agents:
- `AGENTS.md`: For technical standards and patterns.
- `MEMORY.md`: For historical context and learned behaviors.
- `CONTRIBUTING.md`: For both human and AI contribution guidelines.
- `adr/`: For Architectural Decision Records.
- `spec/`: For authoritative specifications.

## Consequences
- **Positive**: Clearer guidance for AI agents, better tracking of project history, and more consistent development.
- **Negative**: Slight overhead in maintaining additional documentation.
