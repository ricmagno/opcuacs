# Rust Style Guide

## General Principles
- Use standard `rustfmt` for all formatting.
- Follow the guidelines from [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/).
- Prefer `clippy` for linting and follow its recommendations.

## Naming Conventions
- `PascalCase` for types, traits, and enums.
- `snake_case` for functions, variables, modules, and crates.
- `SCREAMING_SNAKE_CASE` for constants.
- Avoid prefixes/suffixes like `_t` or `_struct`.

## Error Handling
- Use `Result` for all fallible operations.
- Avoid `unwrap()` and `expect()` in library code; use them sparingly in binary code.
- Provide descriptive error types using `thiserror` or similar crates.

## Concurrency & Async
- Use `tokio` for the asynchronous runtime.
- Keep `async` blocks small and focused.
- Be mindful of blocking code in async contexts; use `spawn_blocking` if necessary.

## Testing
- Write unit tests in the same file as the code being tested (within a `mod tests` block).
- Write integration tests in the `tests/` directory.
- Aim for high test coverage of core logic.
