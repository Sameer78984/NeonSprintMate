# 🚀 NeonSprintMate: Enterprise-Grade Backend Engine

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="Neon" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white" alt="Passport" />
  <img src="https://img.shields.io/badge/Arcjet-000000?style=for-the-badge&logo=arcjet&logoColor=white" alt="Arcjet" />
  <img src="https://img.shields.io/badge/Knex.js-E16422?style=for-the-badge&logo=knexdotjs&logoColor=white" alt="Knex" />
</p>

---

## 🌟 Overview

**NeonSprintMate Backend** is a robust, modular REST API built for high-scale productivity management. It transitions from standard "dummy" implementations to a **fully relational serverless architecture** powered by Neon PostgreSQL.

Designed with **Security-First** principles, it features multi-layer authorization (RBAC), production-hardened database connections, and specialized middleware for request validation and error handling.

---

## 💎 Core Features

### 🔐 Advanced Authentication

- **Hybrid Session Management**: Secured via Passport.js with persistent Neon PostgreSQL session storage.
- **Security Hardening**: Integrated WAF protection via Arcjet and production proxy support.

### 🤝 Relational Team Management

- **RBAC Logic**: Admin-only permissions for critical team operations.
- **Membership Graph**: Many-to-Many relationships between users and teams via optimized join tables.

### 📋 Secure Task Orchestration

- **Status Filtering**: Backend-level filtering (Todo, In-Progress, Done) optimized for Kanban boards.
- **Resource Guarding**: Strict membership checks to prevent horizontal privilege escalation.

---

## 🏗️ Architectural Diagram

---

## 🚦 API Roadmap

### Auth Module

- `POST /api/auth/register` — User onboarding and account creation.
- `POST /api/auth/login` — Secure session initiation and cookie setting.
- `POST /api/auth/logout` — Session destruction and cookie clearance.

### Teams Module

- `GET /api/teams` — Fetch all teams the authenticated user has joined.
- `POST /api/teams` — Create a team with the creator auto-assigned as Admin.
- `PATCH /api/teams/:id` — Update team details (Admin restricted).
- `DELETE /api/teams/:id` — Cascading removal of team assets and memberships.

### Tasks Module

- `GET /api/tasks?team_id=X` — Retrieve dashboard data with optional status filtering.
- `POST /api/tasks` — Relational task creation linked to specific teams.
- `PATCH /api/tasks/:id` — Partial updates for status changes and Kanban drag-and-drop.
- `DELETE /api/tasks/:id` — Secure removal of specific work items.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Config
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5473

# Database (Neon PostgreSQL)
# Includes SSL & Channel Binding for production-grade security
DATABASE_URL=postgres://user:pass@host/neondb?sslmode=require&channel_binding=require

# Security & Sessions
ARCJET_KEY=aj_key_************************
ARCJET_ENV=development
SESSION_SECRET=*********************
USE_DB_SESSION=false # Set true for persistent Neon sessions

```

## 🚀 Getting Started

Follow these steps to set up the backend on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd backend
   Install Dependencies: Ensure you have Node.js installed, then run:
   ```

```
npm install
```

Configure Environment Variables: Create a .env file in the root directory and add your credentials as shown in the Environment Configuration section above.

Initialize Database Schema: Run the Knex migrations to establish the relational tables in your Neon PostgreSQL instance:

```

npx knex migrate:latest
Launch the Development Server:

```

```
npm run dev
```

Verify the Connection: Check your terminal for the ✅ Neon PostgreSQL: Connection Verified message to confirm your backend is successfully communicating with the database.
