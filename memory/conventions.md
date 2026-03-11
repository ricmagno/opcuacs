# Coding Conventions

## Rust
- Follow `rustfmt` and `clippy`.
- `PascalCase` for types/traits, `snake_case` for functions/variables/modules.
- Explicit error handling with `Result` and `Option` — avoid `unwrap()` in library code.
- Use `tokio` for async I/O.
- Full style guide: [conductor/code_styleguides/rust.md](../conductor/code_styleguides/rust.md)

## Frontend (TypeScript/React)
- Full style guide: [conductor/code_styleguides/typescript.md](../conductor/code_styleguides/typescript.md)

## Commits
- Use conventional commits: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Full details: [conductor/workflow.md — Commit Guidelines](../conductor/workflow.md#commit-guidelines)
