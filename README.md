# Inbound Medical Portal

A full-stack medical tourism platform connecting patients with healthcare providers.

## Architecture

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui.
- **Backend**: Node.js, Express, tRPC.
- **Database**: PostgreSQL (managed via Drizzle ORM).
- **Infrastructure**: Single Docker container deployable to Google Cloud Run.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

1.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

2.  **Environment Setup**:
    Copy `.env.example` to `.env` and configure your database connection string.
    ```bash
    cp .env.example .env
    ```

3.  **Database Migration**:
    ```bash
    npm run db:push
    ```

4.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    This launches the backend server (default port 3000) which proxies to the Vite frontend.

## Production Build

To build the application for production:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Deployment

This project is configured for deployment on Google Cloud Run with Cloud SQL.
See [DEPLOYMENT_GCP.md](./DEPLOYMENT_GCP.md) for detailed instructions.

## Project Structure

- **`client/`**: React frontend application.
- **`server/`**: Node.js Express server, tRPC routers, and API endpoints.
- **`drizzle/`**: Drizzle ORM schema and migrations.
- **`shared/`**: Types and constants shared between client and server.

For a detailed breakdown of the codebase, see [STRUCTURE.md](./STRUCTURE.md).
