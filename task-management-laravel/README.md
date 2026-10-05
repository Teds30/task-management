# Laravel API

This directory contains the Laravel 13 REST API for the Task Management application. It provides Sanctum-based authentication and project CRUD endpoints, backed by MySQL in the Sail development environment.

For the whole-project overview and setup order, see the [repository README](../README.md). The React app has separate [frontend setup instructions](../task-management-react/README.md).

## Requirements

- Docker Desktop or Docker Engine with Docker Compose
- PHP 8.3+ and Composer
- Make (recommended; available by default in most Linux and WSL environments)

## Setup

Run these commands from this directory:

```bash
cd task-management-laravel
composer install
cp .env.example .env
make setup
```

`make setup` starts the Sail containers, generates the application key, and runs a fresh migration and seed. **It removes the existing Sail containers and resets the database tables**, so do not use it if you need to preserve local data.

The API will be available at `http://localhost:8000`. Check that it is running at `http://localhost:8000/api/health`.

## Useful commands

Run these from this directory:

| Command                   | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| `make start`              | Start the Sail containers in the background           |
| `make remove`             | Stop and remove the Sail containers                   |
| `make restart`            | Restart the containers                                |
| `make bash`               | Open a shell in the app container                     |
| `make migrate`            | Apply pending migrations                              |
| `make migrate-fresh-seed` | Reset tables, rerun migrations, and seed the database |

## API routes

- `GET /api/health` — health check
- `/api/auth/*` — authentication endpoints
- `/api/projects` — authenticated project endpoints

See the [API documentation](API.md) for endpoint details, request fields, response examples, and pagination options.

## Related documentation

1. [Repository overview and getting started](../README.md)
2. [React frontend setup](../task-management-react/README.md)
