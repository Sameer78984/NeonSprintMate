<div align="center">

# ⚙️ NeonSprintMate Backend

### **Enterprise-Grade REST API with Security-First Architecture**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Knex.js](https://img.shields.io/badge/Knex.js-3.1.0-E16422?style=for-the-badge)](https://knexjs.org/)

**A production-ready, security-hardened backend API built with modern Node.js practices**

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [📦 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📡 API Endpoints](#-api-endpoints)
- [🔒 Security](#-security)
- [🗄️ Database Schema](#️-database-schema)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)

---

## 🌟 Overview

The NeonSprintMate backend is a **modular, scalable REST API** designed for enterprise-level task management. It implements industry best practices for security, validation, and database management.

### **Key Characteristics**

- ✅ **Security-First** - Multi-layer security with WAF protection
- ✅ **Modular Architecture** - Feature-based module organization
- ✅ **Type-Safe Queries** - Knex.js for SQL safety
- ✅ **Session Management** - PostgreSQL-backed sessions
- ✅ **Input Validation** - Express-validator with sanitization
- ✅ **Error Handling** - Comprehensive error middleware
- ✅ **Production-Ready** - Optimized for scale

---

## ✨ Features

### **🔐 Authentication & Authorization**

- **Passport.js Integration**
  - Local strategy for email/password
  - Session-based authentication
  - Serialization/deserialization
  - Secure password hashing (bcrypt)

- **Session Management**
  - PostgreSQL session storage (production)
  - Memory store fallback (development)
  - HTTP-only cookies
  - Secure flag in production
  - Configurable session duration

- **Role-Based Access Control (RBAC)**
  - Team admin permissions
  - Task creator permissions
  - Membership-based authorization
  - Protected route middleware

### **🛡️ Security Features**

- **Arcjet WAF**
  - Rate limiting
  - Bot detection
  - Request validation
  - DDoS protection

- **Input Validation**
  - Express-validator schemas
  - SQL injection prevention
  - XSS protection
  - Data sanitization

- **Security Headers**
  - Helmet.js integration
  - CORS configuration
  - Trust proxy setup

### **📊 Database Management**

- **Knex.js ORM**
  - Type-safe queries
  - Migration system
  - Transaction support
  - Connection pooling

- **PostgreSQL Features**
  - Foreign key constraints
  - Cascade deletes
  - Indexed queries
  - Relational integrity

---

## 🏗️ Architecture

### **Module Structure**

```
src/
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   └── auth.validator.js
│   ├── teams/           # Team management module
│   │   ├── teams.controller.js
│   │   ├── teams.routes.js
│   │   └── teams.validator.js
│   └── tasks/           # Task management module
│       ├── tasks.controller.js
│       ├── tasks.routes.js
│       ├── tasks.validator.js
│       └── tasks.reminder.js
│
├── config/              # Configuration files
│   ├── db.js           # Database connection
│   ├── passport.js     # Passport configuration
│   └── session.js      # Session configuration
│
├── database/            # Database files
│   └── migrations/     # Knex migrations
│       └── 001_initial_schema.js
│
├── middleware/          # Express middleware
│   ├── authGuard.js    # Authentication guard
│   ├── errorHandler.js # Error handling
│   ├── security.js     # Security middleware
│   └── validate.js     # Validation middleware
│
└── server.js           # Application entry point
```

### **Request Flow**

```
Client Request
    ↓
Express App
    ↓
Security Middleware (Arcjet, Helmet, CORS)
    ↓
Session Middleware
    ↓
Passport Middleware
    ↓
Route Handler
    ↓
Validation Middleware
    ↓
Controller
    ↓
Database (Knex.js)
    ↓
Response
```

---

## 📦 Project Structure

### **Module Organization**

Each module follows a consistent structure:

```
module/
├── module.controller.js  # Business logic
├── module.routes.js      # Route definitions
└── module.validator.js   # Input validation
```

### **Middleware Stack**

1. **Security Layer**
   - Helmet.js (security headers)
   - CORS (cross-origin requests)
   - Arcjet (WAF protection)

2. **Session Layer**
   - Express-session
   - Passport initialization
   - Session persistence

3. **Validation Layer**
   - Express-validator
   - Custom validation middleware
   - Error formatting

4. **Authorization Layer**
   - Authentication guard
   - Role-based checks
   - Resource ownership verification

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|:--------|:--------|:--------|
| **express** | 5.2.1 | Web framework |
| **passport** | 0.7.0 | Authentication |
| **passport-local** | 1.0.0 | Local auth strategy |
| **express-session** | 1.18.2 | Session management |
| **connect-pg-simple** | 10.0.0 | PostgreSQL sessions |
| **knex** | 3.1.0 | SQL query builder |
| **pg** | 8.17.1 | PostgreSQL driver |
| **bcryptjs** | 3.0.3 | Password hashing |
| **express-validator** | 7.3.1 | Input validation |
| **helmet** | 8.1.0 | Security headers |
| **cors** | 2.8.5 | CORS middleware |
| **morgan** | 1.10.1 | HTTP logger |
| **@arcjet/node** | 1.0.0-beta.17 | WAF protection |

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20.x or higher
- PostgreSQL database (Neon PostgreSQL recommended)
- npm 9.x or higher

### **Installation**

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   ```

4. **Set up environment variables**
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   DATABASE_URL=postgres://user:pass@host/db?sslmode=require
   SESSION_SECRET=your-super-secret-key-here
   ARCJET_KEY=your-arcjet-key
   ARCJET_ENV=development
   USE_DB_SESSION=true
   ```

5. **Run database migrations**
   ```bash
   npx knex migrate:latest
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Verify connection**
   - Check terminal for: `✅ Neon PostgreSQL: Connection Verified`
   - API available at: `http://localhost:5000/api`

### **Available Scripts**

```bash
# Development
npm run dev          # Start with nodemon (auto-reload)

# Production
npm start            # Start production server

# Database
npx knex migrate:latest    # Run migrations
npx knex migrate:rollback  # Rollback last migration
npx knex seed:run          # Run seed files
```

---

## 📡 API Endpoints

### **Authentication Endpoints**

#### `POST /api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `POST /api/auth/login`
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Welcome back!",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "reminders": [
    {
      "id": 1,
      "title": "Task due soon",
      "due_date": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

#### `POST /api/auth/logout`
Destroy user session.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### `GET /api/auth/me`
Get current authenticated user.

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

### **Team Endpoints**

#### `GET /api/teams`
Get all teams for authenticated user.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Development Team",
      "description": "Main dev team",
      "created_by": 1,
      "role": "admin",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### `POST /api/teams`
Create a new team.

**Request Body:**
```json
{
  "name": "New Team",
  "description": "Team description"
}
```

**Response:**
```json
{
  "message": "Team created",
  "data": {
    "id": 1,
    "name": "New Team",
    "description": "Team description",
    "created_by": 1,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `PUT /api/teams/:id`
Update team (admin only).

**Request Body:**
```json
{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

#### `DELETE /api/teams/:id`
Delete team (admin only).

**Response:**
```json
{
  "message": "Team deleted successfully"
}
```

#### `GET /api/teams/:id/members`
Get team members.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  ]
}
```

#### `POST /api/teams/:id/members`
Add member to team (admin only).

**Request Body:**
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

---

### **Task Endpoints**

#### `GET /api/tasks?team_id=1`
Get tasks for a team.

**Query Parameters:**
- `team_id` (required): Team ID

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Complete feature",
      "description": "Task description",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": 2,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### `POST /api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "team_id": 1,
  "assigned_to": 2,
  "status": "todo",
  "priority": "medium"
}
```

#### `PUT /api/tasks/:id`
Update a task.

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in_progress",
  "priority": "high",
  "assigned_to": 2
}
```

#### `DELETE /api/tasks/:id`
Delete a task (creator/admin only).

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

#### `PATCH /api/tasks/:id/assign`
Assign task to user.

**Request Body:**
```json
{
  "userId": 2
}
```

---

## 🔒 Security

### **Authentication Flow**

1. User submits credentials
2. Passport validates with database
3. Session created and stored
4. HTTP-only cookie set
5. User serialized in session

### **Authorization Checks**

- **Team Operations**: Verify membership
- **Admin Operations**: Verify admin role
- **Task Operations**: Verify team membership
- **Task Deletion**: Verify creator or admin role

### **Input Validation**

All inputs validated using express-validator:
- Email format validation
- Password strength requirements
- SQL injection prevention
- XSS protection via sanitization

### **Security Headers**

Helmet.js provides:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

---

## 🗄️ Database Schema

### **Tables**

#### **users**
```sql
id              SERIAL PRIMARY KEY
username        VARCHAR(255) UNIQUE NOT NULL
email           VARCHAR(255) UNIQUE NOT NULL
password        VARCHAR(255) NOT NULL
name            VARCHAR(255)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

#### **teams**
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
description     TEXT
created_by      INTEGER REFERENCES users(id) ON DELETE CASCADE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

#### **membership**
```sql
id              SERIAL PRIMARY KEY
team_id         INTEGER REFERENCES teams(id) ON DELETE CASCADE
user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE
role            VARCHAR(50) DEFAULT 'member'
created_at      TIMESTAMP
updated_at      TIMESTAMP
UNIQUE(team_id, user_id)
```

#### **tasks**
```sql
id              SERIAL PRIMARY KEY
title           VARCHAR(255) NOT NULL
description     TEXT
status          ENUM('todo', 'in_progress', 'done') DEFAULT 'todo'
priority        ENUM('low', 'medium', 'high') DEFAULT 'medium'
assigned_to     INTEGER REFERENCES users(id) ON DELETE SET NULL
team_id         INTEGER REFERENCES teams(id) ON DELETE CASCADE
created_by      INTEGER REFERENCES users(id) ON DELETE CASCADE
due_date        TIMESTAMP
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

#### **sessions** (Auto-created by connect-pg-simple)
```sql
sid             VARCHAR PRIMARY KEY
sess            JSON NOT NULL
expire          TIMESTAMP NOT NULL
```

---

## 🧪 Testing

### **Manual Testing**

1. **Authentication**
   ```bash
   # Register
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@test.com","password":"Test123!","name":"Test User"}'
   
   # Login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -c cookies.txt \
     -d '{"email":"test@test.com","password":"Test123!"}'
   ```

2. **Teams**
   ```bash
   # Get teams (with session cookie)
   curl -X GET http://localhost:5000/api/teams \
     -b cookies.txt
   ```

---

## 🚢 Deployment

### **Environment Setup**

1. **Production Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.com
   DATABASE_URL=postgres://...?sslmode=require
   SESSION_SECRET=strong-random-secret
   USE_DB_SESSION=true
   ARCJET_KEY=your-production-key
   ARCJET_ENV=production
   ```

2. **Database Migration**
   ```bash
   npx knex migrate:latest
   ```

3. **Start Server**
   ```bash
   npm start
   ```

### **Recommended Platforms**

- **Render** - Easy PostgreSQL + Node.js deployment
- **Railway** - Full-stack deployment
- **Heroku** - Traditional PaaS
- **AWS/DigitalOcean** - VPS deployment

---

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Passport.js Guide](http://www.passportjs.org/)
- [Knex.js Documentation](https://knexjs.org/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Arcjet Documentation](https://arcjet.com/docs)

---

<div align="center">

### **Built with ❤️ using Node.js and Express**

[⬆ Back to Top](#️-neonsprintmate-backend)

</div>
