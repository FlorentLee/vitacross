# Project Structure Guide

This project is a **Node.js Fullstack Monorepo**. It contains both the React frontend and the Express/tRPC backend in a single repository, sharing types and configuration.

## 📂 Root Directory
*   **`package.json`**: Orchestrates the entire project. Scripts like `npm run dev` and `npm run build` run both frontend and backend tasks.
*   **`Dockerfile`**: Defines how to build the single production container.
*   **`drizzle.config.ts`**: Configuration for Drizzle Kit (database migrations).

## 📂 client/ (Frontend)
The React application (Vite).

*   **`src/pages/`**: Application routes (e.g., `Home.tsx`, `Consultation.tsx`, `Login.tsx`).
*   **`src/components/`**: Reusable UI components (buttons, cards, etc.).
*   **`src/contexts/`**: Global state (e.g., `AuthContext.tsx` manages user login state).
*   **`src/lib/`**: Utilities and API clients.
    *   `trpc.ts`: The type-safe client that talks to the backend.
    *   `api.ts`: (If any) Standard REST clients.

## 📂 server/ (Backend)
The Node.js Express server.

*   **`_core/index.ts`**: **Entry Point**. Sets up the Express server, middleware, and starts listening on the port.
*   **`routers.ts`**: **API Logic**. Defines the tRPC routers (e.g., `consultation`, `medicalFile`). This is where your business logic lives.
*   **`db.ts`**: **Database**. Connects to PostgreSQL and exports helper functions (e.g., `createPatientConsultation`).
*   **`_core/authRoutes.ts`**: **Authentication**. Handles standard REST endpoints for Login/Register (`/api/auth/...`).

## 📂 drizzle/ (Database Schema)
*   **`schema.ts`**: Defines the database tables and their relationships using Drizzle ORM.
*   **`migrations/`**: Generated SQL files to apply changes to the database.

## 📂 shared/ (Shared Code)
*   **`types.ts`**: TypeScript interfaces shared between Client and Server (e.g., `User`, `Consultation`). This ensures that if you change a type in the backend, the frontend updates automatically.

## 🔄 Data Flow Example (Consultation)

1.  **User Action**: User clicks "Submit" in `client/src/pages/Consultation.tsx`.
2.  **Frontend**: Calls `trpc.consultation.create.mutate(data)`.
3.  **Network**: Request goes to `POST /api/trpc/consultation.create`.
4.  **Backend**: `server/routers.ts` receives the request.
5.  **Database**: Router calls `db.createPatientConsultation(data)` in `server/db.ts` to save to PostgreSQL.
