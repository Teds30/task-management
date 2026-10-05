# API Documentation

This document describes the Laravel Task Management API. All routes are prefixed with `/api`.

## Base URL and request format

For local development, the base URL is `http://localhost:8000/api`. Send JSON request bodies with `Content-Type: application/json` and request JSON responses with `Accept: application/json`.

Protected routes require a Sanctum personal access token in the authorization header:

```http
Authorization: Bearer <token>
```

## Authentication

### `POST /auth/login`

Authenticate with a username and password.

Request:

```json
{
    "username": "demo",
    "password": "password"
}
```

Fields:

| Field      | Required | Rules                        |
| ---------- | -------- | ---------------------------- |
| `username` | Yes      | String, up to 255 characters |
| `password` | Yes      | String                       |

Success (`200 OK`):

```json
{
    "status": "success",
    "message": "Login successful.",
    "data": {
        "user": {
            "id": 1,
            "username": "demo",
            "name": "Demo User",
            "email": "demo@example.com"
        },
        "token": "<plain-text-token>"
    }
}
```

The seeded local development account is `demo` / `password`. Use this only in a local development environment.

### `GET /auth/me`

Return the authenticated user. Requires a bearer token.

Success (`200 OK`):

```json
{
    "data": {
        "id": 1,
        "username": "demo",
        "name": "Demo User",
        "email": "demo@example.com"
    }
}
```

### `POST /auth/logout`

Revoke the current bearer token. Requires authentication. Returns `204 No Content` on success.

### `POST /auth/logout-all`

Revoke all bearer tokens for the authenticated user, logging out other devices as well. Requires authentication. Returns `204 No Content` on success.

## Health check

### `GET /health`

No authentication required.

```json
{
    "status": "ok"
}
```

## Projects

All project endpoints require a bearer token. Project request fields use `snake_case`; returned project fields use `camelCase`.

### Project fields

| Request field | Response field | Type             | Create requirement / validation                  |
| ------------- | -------------- | ---------------- | ------------------------------------------------ |
| `client_name` | `clientName`   | String           | Required; max 255 characters                     |
| `name`        | `projectName`  | String           | Required; max 255 characters                     |
| `description` | `description`  | String or `null` | Optional; nullable                               |
| `status`      | `status`       | Enum string      | Required; one of the supported statuses below    |
| `priority`    | `priority`     | Enum string      | Required; one of the supported priorities below  |
| `start_date`  | `startDate`    | Date             | Required; valid date                             |
| `due_date`    | `dueDate`      | Date             | Required; valid date and not before `start_date` |

Status values: `planning`, `in_progress`, `on_hold`, `completed`.

Priority values: `low`, `medium`, `high`.

Example project response:

```json
{
    "id": 12,
    "clientName": "Acme Ltd",
    "projectName": "Website refresh",
    "description": "Redesign the marketing site",
    "status": "in_progress",
    "priority": "high",
    "startDate": "2026-09-01T00:00:00.000000Z",
    "dueDate": "2026-11-30T00:00:00.000000Z"
}
```

### `GET /projects`

List projects. Results are paginated, with optional search, filters, and sorting.

| Query parameter  | Rules                                                                            | Description                                   |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| `page`           | Integer, minimum 1                                                               | Page number                                   |
| `per_page`       | Integer, 1–100; default 15                                                       | Number of projects per page                   |
| `search`         | String, max 255                                                                  | Partial match across project and client names |
| `client_name`    | String, max 255                                                                  | Partial match on client name                  |
| `name`           | String, max 255                                                                  | Partial match on project name                 |
| `status`         | Supported status value                                                           | Exact status filter                           |
| `priority`       | Supported priority value                                                         | Exact priority filter                         |
| `sort_by`        | `id`, `name`, `client_name`, `status`, `priority`, `created_at`, or `updated_at` | Sort column; default `id`                     |
| `sort_direction` | `asc` or `desc`                                                                  | Sort direction; default `desc`                |

Example: `GET /projects?search=acme&status=in_progress&page=1&per_page=10&sort_by=name&sort_direction=asc`

Success (`200 OK`):

```json
{
    "status": "success",
    "message": "Projects retrieved successfully.",
    "data": [
        {
            "id": 12,
            "clientName": "Acme Ltd",
            "projectName": "Website refresh",
            "description": "Redesign the marketing site",
            "status": "in_progress",
            "priority": "high",
            "startDate": "2026-09-01T00:00:00.000000Z",
            "dueDate": "2026-11-30T00:00:00.000000Z"
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    }
}
```

### `POST /projects`

Create a project. Requires authentication. All fields in the project fields table are required except `description`.

Request:

```json
{
    "client_name": "Acme Ltd",
    "name": "Website refresh",
    "description": "Redesign the marketing site",
    "status": "planning",
    "priority": "medium",
    "start_date": "2026-09-01",
    "due_date": "2026-11-30"
}
```

Returns `201 Created` with the standard success envelope and the created project in `data`.

### `GET /projects/{id}`

Retrieve one project by ID. Requires authentication. Returns `200 OK` with the standard success envelope and the project in `data`.

### `PUT /projects/{id}` and `PATCH /projects/{id}`

Update a project. Requires authentication. All supported request fields are optional; provided values are validated using the same field rules as create. Returns `200 OK` with the updated project in `data`.

### `DELETE /projects/{id}`

Delete a project. Requires authentication. Returns `204 No Content` on success.

## Responses and errors

Successful JSON responses for login and project operations use this envelope unless otherwise noted:

```json
{
    "status": "success",
    "message": "...",
    "data": {}
}
```

The project list adds a `meta` object for pagination. No-content responses (`204`) have no body. Authentication and validation failures use standard Laravel JSON errors; invalid fields return `422 Unprocessable Entity` with an `errors` object. Requests without a valid token to protected routes return `401 Unauthorized`. Missing projects return `404 Not Found`.
