# Tech Stack

## Programming Language
- **Python:**
    - **Version:** Python 3.9+ (latest stable version recommended for security and features)
    - **Reasoning:** Chosen explicitly by the user, Python offers a rich ecosystem, excellent readability, and strong community support, making it ideal for rapid development and maintenance in industrial automation.

## Core Libraries/Frameworks
- **asyncio (Python Standard Library):**
    - **Reasoning:** For handling asynchronous I/O, critical for non-blocking communication in OPC UA clients and servers, ensuring responsiveness and efficient resource utilization.
- **python-opcua (Client & Server):**
    - **Reasoning:** A well-established open-source OPC UA library for Python. It provides the necessary functionalities to implement both OPC UA client and server roles, abstracting away the complexities of the OPC UA specification.

## Data Storage (for Server-side persistence, if needed)
- **SQLite (Python Standard Library):**
    - **Reasoning:** Lightweight, file-based database, suitable for local persistence of server configurations, historical data, or user management without requiring external database server setup. Good for proof-of-concept and smaller deployments.
- **PostgreSQL (with SQLAlchemy ORM):**
    - **Reasoning:** For more robust and scalable data persistence needs, especially for larger industrial deployments requiring transactional integrity, complex queries, and concurrent access. SQLAlchemy provides an ORM for Python, simplifying database interactions.

## Development Tools
- **Poetry / pipenv:**
    - **Reasoning:** For dependency management and virtual environment creation, ensuring reproducible builds and isolating project dependencies.
- **pytest:**
    - **Reasoning:** A powerful and flexible testing framework for Python, essential for writing comprehensive unit and integration tests.
- **black / ruff:**
    - **Reasoning:** Code formatters/linters to maintain consistent code style and enforce best practices across the codebase.

## Deployment & Containerization
- **Docker:**
    - **Reasoning:** For containerizing the OPC UA client and server applications, providing isolated, portable, and consistent environments for development, testing, and deployment across various industrial computing platforms.
