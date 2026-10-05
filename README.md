# Task Management

A full-stack Client Project Tracker for a digital agency to manage client projects, monitor project progress, and organize project priorities and deadlines.

The application consists of a Laravel REST API backend and a separate React + TypeScript frontend dashboard. It includes the required project management functionality as well as additional features such as search, filtering, sorting, authentication, Docker support, and deployment configuration.

## Features Implemented

### Project Management

- View all client projects.
- View individual project details.
- Create new projects.
- Edit existing projects.
- Delete projects.
- Manage project information including:
    - Client Name
    - Project Name
    - Description
    - Status
    - Priority
    - Start Date
    - Due Date

### Status & Priority

Supported project statuses:

- Planning
- In Progress
- On Hold
- Completed

Supported project priorities:

- Low
- Medium
- High

### Search, Filtering & Sorting

- Search projects.
- Filter projects by status.
- Filter projects by priority.
- Sort projects.

### Authentication

- User authentication using Laravel Sanctum.
- Protected project management functionality.
- Frontend authentication flow integrated with the Laravel API.

### Validation

- Client Name is required.
- Project Name is required.
- Status must be a valid supported value.
- Priority must be a valid supported value.
- Due Date cannot be earlier than Start Date.
- Invalid API requests return meaningful validation errors.

### Infrastructure & Deployment

- Docker-based backend development environment using Laravel Sail.
- Docker Compose support for the frontend production service.
- Deployment configuration for the frontend and backend.

## Project Areas

| Area         | Folder                                                       | Stack                                           |
| ------------ | ------------------------------------------------------------ | ----------------------------------------------- |
| Backend API  | [task-management-laravel](task-management-laravel/README.md) | Laravel 13, Sanctum, MySQL, Sail                |
| Frontend app | [task-management-react](task-management-react/README.md)     | React, TypeScript, React Router, TanStack Query |

## Requirements

- Docker with Docker Compose
- PHP 8.3+ and Composer (for backend setup)
- Node.js and npm (for frontend setup)
- Make recommended for frontend and backend commands

## Getting Started

Set up and start the backend first, then configure and run the frontend.

Detailed installation steps, environment configuration, Docker options, and commands are maintained with each application:

1. [Install and run the Laravel backend](task-management-laravel/README.md#setup)
2. [Configure and run the React frontend](task-management-react/README.md#setup)

When both applications are running:

- **Backend API:** `http://localhost:8000`
- **Frontend development:** `http://localhost:5173`
- **Frontend Docker service:** `http://localhost:3000`

## API

The Laravel backend provides RESTful endpoints for project management:

| Method   | Endpoint             | Description          |
| -------- | -------------------- | -------------------- |
| `GET`    | `/api/projects`      | Get all projects     |
| `GET`    | `/api/projects/{id}` | Get a single project |
| `POST`   | `/api/projects`      | Create a project     |
| `PUT`    | `/api/projects/{id}` | Update a project     |
| `DELETE` | `/api/projects/{id}` | Delete a project     |

Authentication endpoints are also provided by the Laravel backend.

For detailed API documentation and backend setup instructions, see the [Laravel README](task-management-laravel/README.md).

## Assumptions Made

- The application is intended for project managers at a digital agency to manage client projects.
- The Laravel API is the source of truth for project and authentication data.
- The React frontend communicates with the backend through the REST API.
- Authentication is required to access project management functionality.
- A project's due date must be on or after its start date.
- Project status and priority are restricted to the predefined values specified in the requirements.
- Search is intended to help users locate projects based on the available project information rather than provide full-text search across arbitrary data.
- The provided database setup and seed workflow is intended for local development and evaluation.
- Docker is recommended for both the frontend and backend environments, while the frontend can also be run directly with Node.js and npm.

## Documentation

For application-specific documentation:

- [Laravel Backend README](task-management-laravel/README.md) — backend setup, authentication, API, database, Docker/Sail, and development commands.
- [React Frontend README](task-management-react/README.md) — frontend setup, environment configuration, Docker, development commands, and troubleshooting.
