# CLAUDE.md — OPCUACS Project Instructions

This file is automatically loaded by Claude Code at the start of every session.

## Memory
@memory/MEMORY.md

## Project Context
@AGENTS.md
@conductor/index.md

## Key References
- **Plan (Source of Truth)**: `plan.md`
- **Workflow**: `conductor/workflow.md`
- **Tech Stack**: `conductor/tech-stack.md`
- **Product Definition**: `conductor/product.md`
- **Product Guidelines**: `conductor/product-guidelines.md`
- **Style Guides**: `conductor/code_styleguides/`

## Rules
- Follow the Conductor workflow for all task execution.
- Update `memory/` when discovering new patterns, gotchas, or making decisions.
- Use `plan.md` to track all work (mark tasks `[~]` in-progress, `[x]` done).
- Use conventional commits: `<type>(<scope>): <description>`.
- Rust code must pass `rustfmt` and `clippy` before committing.
