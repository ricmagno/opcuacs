# Build Stage
FROM rust:1.94-slim-bullseye AS builder

WORKDIR /usr/src/app
COPY . .

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev

# Build the application
RUN cargo build --release --bin engine

# Final Stage
FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /usr/src/app/target/release/engine .

CMD ["./engine"]
