# Task Management Frontend

A React + TypeScript dashboard for tracking client projects against the Laravel REST API. The app uses React Router Framework mode with server rendering, TanStack Query for server state, and Zod for validated forms.

For the repository overview and setup order, see the main README.

> **Quick start:** start the Laravel backend, create `.env`, install the frontend dependencies, then run `make dev`.

Run every command in this README from the `task-management-react/` directory unless it says otherwise.

## Requirements

- Node.js and npm
- Make (recommended; available by default in most Linux and WSL environments)
- Docker Desktop or Docker Engine with Docker Compose, only if you want to run the production-style Docker container

## Before you start

The frontend talks to the Laravel backend, so **the backend must be running first**.

- Backend API: `http://localhost:8000`
- Follow the [Laravel backend setup](../task-management-laravel/README.md) if it is not running yet.

## First-time setup

Follow these steps when setting up the frontend for the first time.

Run all commands from the `task-management-react/` directory.

1. Make sure the Laravel backend is running.

2. Create your environment file:

    ```bash
    cp .env.example .env
    ```

3. Open `.env` and confirm the API URL:

    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

    If you are connecting to a deployed backend, set `VITE_API_URL` to the publicly reachable URL of that API.

4. Install the frontend dependencies:

    ```bash
    make install
    ```

    Or, without Make:

    ```bash
    npm install
    ```

5. Start the development server:

    ```bash
    make dev
    ```

    Or, without Make:

    ```bash
    npm run dev
    ```

6. Open the frontend at:

    `http://localhost:5173`

That's it. The frontend now runs directly on your machine with Vite.

## Daily development

After the initial setup, make sure the Laravel backend is running and start the frontend development server:

```bash
make dev
```

Then open:

`http://localhost:5173`

Vite provides hot reload, so changes to the source files are automatically reflected in the browser.

You normally do **not** need Docker for frontend development.

## Environment configuration

The frontend uses `VITE_API_URL` to determine which Laravel API it should communicate with.

For local development:

```env
VITE_API_URL=http://localhost:8000/api
```

For a deployed environment, set it to the publicly reachable URL of the deployed API.

| Situation        | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| Local backend    | `VITE_API_URL=http://localhost:8000/api`                 |
| Deployed backend | Set it to the publicly reachable URL of the deployed API |

If you change `.env` while the development server is running, restart the Vite development server so the new value is loaded.

## Useful commands

All development commands run directly on your machine.

### Development

| Command          | Purpose                                        | Manual equivalent   |
| ---------------- | ---------------------------------------------- | ------------------- |
| `make install`   | Install frontend dependencies                  | `npm install`       |
| `make dev`       | Start the Vite development server              | `npm run dev`       |
| `make typecheck` | Generate route types and run TypeScript checks | `npm run typecheck` |
| `make build`     | Build the frontend assets                      | `npm run build`     |

### Docker

Docker is **not required for normal frontend development**.

The Docker commands are available when you want to build and test the production-style frontend container.

| Command        | Purpose                                        | Manual equivalent                                     |
| -------------- | ---------------------------------------------- | ----------------------------------------------------- |
| `make start`   | Build and start the Docker Compose service     | `docker compose up --build -d`                        |
| `make remove`  | Stop and remove the Docker Compose services    | `docker compose down`                                 |
| `make restart` | Rebuild and restart the Docker Compose service | `docker compose down && docker compose up --build -d` |
| `make logs`    | Follow the Docker service logs                 | `docker compose logs -f react`                        |

The Dockerized frontend is available at:

`http://localhost:3000`

## Docker Compose

The project includes a [compose.yml](compose.yml) file for running the production-style frontend in Docker.

The `react` service:

- Builds the frontend using the app Dockerfile.
- Runs the production build.
- Serves the application on port `3000` by default.
- Uses `VITE_API_URL` during the Docker image build.

To build and start it:

```bash
make start
```

To stop it:

```bash
make remove
```

To rebuild it after changing the application or environment configuration:

```bash
make restart
```

> **Note:** The Docker service is intended for testing the production-style build. Use `make dev` for normal frontend development.

## Project structure

- `app/features/auth` — login form and API, auth context/token helpers, and login schema.
- `app/features/projects` — project API adapter, types, schema, query hooks, list utilities, and project UI.
- `app/components` — shared UI primitives, app shell/header/sidebar, and feedback panels.
- `app/providers` — React Query and app-wide provider composition.
- `app/lib` — shared API client/error formatting and general utilities.
- `app/routes` — thin React Router entrypoints that compose feature pages.

## Troubleshooting

**The frontend cannot connect to the API, or the backend is not running**

Check that the backend responds:

```bash
curl -i http://localhost:8000/api/health
```

An `{"status":"ok"}` response means the backend is reachable. A connection error means the backend is not reachable.

If the backend is not reachable, start the [Laravel backend](../task-management-laravel/README.md).

If the browser reports a CORS error, make sure the API allows the frontend origin:

`http://localhost:5173`

**`VITE_API_URL` is incorrect**

Open `.env` and confirm:

```env
VITE_API_URL=http://localhost:8000/api
```

The `/api` suffix is required and there should be no trailing slash.

**I changed `.env` but the frontend still uses the old value**

Stop the development server with `Ctrl+C` and start it again:

```bash
make dev
```

If you are running the Docker service, rebuild it:

```bash
make restart
```

**A Docker service fails to start**

Check the container state:

```bash
docker compose ps
```

Then check the logs:

```bash
make logs
```

Make sure Docker is running and that you are in the `task-management-react/` directory.

## Related documentation

1. [Repository overview and getting started](../README.md)
2. [Laravel backend setup and API details](../task-management-laravel/README.md)
