# Task Management

A full-stack project tracker for managing client projects, statuses, priorities, and deadlines. The Laravel API provides authentication and project management; a separate React + TypeScript app provides the dashboard.

## Project areas

| Area         | Folder                                                       | Stack                                           |
| ------------ | ------------------------------------------------------------ | ----------------------------------------------- |
| Backend API  | [task-management-laravel](task-management-laravel/README.md) | Laravel 13, Sanctum, MySQL, Sail                |
| Frontend app | [task-management-react](task-management-react/README.md)     | React, TypeScript, React Router, TanStack Query |

## Requirements

- Docker with Docker Compose
- PHP 8.3+ and Composer (for backend setup)
- Node.js and npm (for frontend setup)
- Make recommended for frontend and backend commands

## Getting started

Set up and start the backend first, then configure and run the frontend. Detailed installation steps, environment configuration, Docker options, and commands are maintained with each app:

1. [Install and run the Laravel backend](task-management-laravel/README.md#setup)
2. [Configure and run the React frontend](task-management-react/README.md#setup)

When both are running, the API is served at `http://localhost:8000`. The frontend is available at `http://localhost:5173` in development, or `http://localhost:3000` when run with the Docker Compose production service.
