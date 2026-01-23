<div align="center">

# ⚡ NeonSprintMate

### 🚀 **Full-Stack Team Task Management System**

*A high-performance, production-ready productivity orchestrator built with modern web technologies*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📚 Documentation](#-documentation)
- [🔒 Security](#-security)
- [🎯 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)

---

## 🌟 Overview

**NeonSprintMate** is an enterprise-grade team task management application designed for modern development teams. It combines a robust, secure backend API with a beautiful, responsive frontend interface to deliver a seamless productivity experience.

### 🎯 **Key Highlights**

- ✅ **Full-Stack Implementation** - Complete PERN stack application
- ✅ **Production-Ready** - Security-hardened with industry best practices
- ✅ **Feature-Complete** - All assessment requirements met + bonus features
- ✅ **Modern Architecture** - Modular, scalable, and maintainable codebase
- ✅ **Beautiful UI** - Neon-themed, responsive design with smooth animations

---

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user registration and login
- Passport.js session-based authentication
- PostgreSQL session storage with memory fallback
- HTTP-only cookies for enhanced security
- Role-based access control (RBAC)
- Input validation and sanitization
- Arcjet WAF protection

### 👥 **Team Management**
- Create and manage teams
- Invite members via email
- Role-based permissions (Admin/Member)
- Team member roster view
- Auto-assignment of team creator as admin

### 📋 **Task Management**
- Create, update, and delete tasks
- Assign tasks to team members
- Status tracking (Todo, In Progress, Done)
- Priority levels (Low, Medium, High)
- Due date support with reminders
- Advanced filtering (by status, assignee, search)
- Role-based task deletion (creators/admins only)

### 🎨 **User Interface**
- Modern neon-themed design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Real-time toast notifications
- Modal-based task creation/editing
- Interactive dashboard with live updates
- Theme customization (Light/Dark mode + Color accents)

### 🎇 **Visuals & UX**
- **Dynamic Theming** - 5+ Color themes (Cyan, Purple, Pink, Lime, Orange)
- **Interactive Backgrounds** - Cyber Rain, Snow, Aurora, and more
- **Micro-Interactions** - "Shake-on-error" inputs, hover glows
- **Password Visibility** - Toggleable password masking
- **Glassmorphism** - Modern glass UI across the application

### 🚀 **Developer Experience**
- Hot module replacement (HMR)
- TypeScript-ready structure
- Comprehensive error handling
- Modular feature-based architecture
- Reusable component library
- Custom hooks for business logic

---

## 🏗️ Architecture

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React 19   │  │  Zustand     │  │  React Router│      │
│  │   + Vite     │  │  State Mgmt  │  │  Navigation  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Express    │  │   Passport   │  │   Arcjet     │      │
│  │   REST API   │  │   Sessions   │  │   WAF        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Auth      │  │    Teams     │  │    Tasks     │      │
│  │  Controller  │  │  Controller  │  │  Controller  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Knex.js    │  │  PostgreSQL  │  │  Sessions    │      │
│  │   ORM        │  │  (Neon)      │  │  Store       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### **Database Schema**

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Users   │      │  Teams   │      │  Tasks   │
├──────────┤      ├──────────┤      ├──────────┤
│ id (PK)  │      │ id (PK)  │      │ id (PK)  │
│ username │      │ name     │      │ title    │
│ email    │◄─────┤ created_by│◄────┤ team_id  │
│ password │      │ desc     │      │ assigned │
│ name     │      └──────────┘      │ status   │
└────┬─────┘            │            │ priority │
     │                  │            │ due_date │
     │            ┌─────▼─────┐     └──────────┘
     └───────────►│ Membership│
                  ├───────────┤
                  │ id (PK)   │
                  │ team_id   │
                  │ user_id   │
                  │ role      │
                  └───────────┘
```

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|:----------|:--------|:--------|
| **React** | 19.2.0 | UI Framework |
| **Vite** | 7.2.4 | Build Tool & Dev Server |
| **Tailwind CSS** | 4.1.18 | Utility-First CSS |
| **Framer Motion** | 12.27.3 | Animation Library |
| **Zustand** | 5.0.10 | State Management |
| **React Router** | 7.12.0 | Client-Side Routing |
| **Axios** | 1.13.2 | HTTP Client |
| **DaisyUI** | 5.5.14 | Component Library |

### **Backend**
| Technology | Version | Purpose |
|:----------|:--------|:--------|
| **Node.js** | 20+ | Runtime Environment |
| **Express** | 5.2.1 | Web Framework |
| **PostgreSQL** | 16 | Relational Database |
| **Knex.js** | 3.1.0 | SQL Query Builder |
| **Passport.js** | 0.7.0 | Authentication |
| **Express-Validator** | 7.3.1 | Input Validation |
| **Bcrypt.js** | 3.0.3 | Password Hashing |
| **Arcjet** | 1.0.0-beta.17 | Web Application Firewall |

---

## 📦 Project Structure

```
NeonSprintMate/
├── 📁 frontend/                 # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 features/        # Feature-based modules
│   │   │   ├── 📁 auth/         # Authentication feature
│   │   │   ├── 📁 dashboard/    # Dashboard components
│   │   │   ├── 📁 landing/      # Landing page
│   │   │   ├── 📁 tasks/        # Task management
│   │   │   └── 📁 teams/        # Team management
│   │   ├── 📁 components/       # Shared UI components
│   │   ├── 📁 stores/           # Zustand state stores
│   │   ├── 📁 lib/              # Utilities & configs
│   │   └── 📁 utils/            # Helper functions
│   ├── package.json
│   └── vite.config.js
│
├── 📁 backend/                  # Node.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 modules/          # Feature modules
│   │   │   ├── 📁 auth/         # Auth routes & logic
│   │   │   ├── 📁 teams/        # Team management
│   │   │   └── 📁 tasks/        # Task management
│   │   ├── 📁 config/           # Configuration files
│   │   ├── 📁 database/         # Migrations & seeds
│   │   ├── 📁 middleware/       # Express middleware
│   │   └── server.js            # Entry point
│   ├── package.json
│   └── knexfile.js
│
├── 📄 README.md                 # This file
├── 📄 LICENSE                   # MIT License
└── 📄 docker-compose.yaml       # Docker configuration
```

---

## 🚀 Quick Start

### **Prerequisites**

- **Node.js** 20.x or higher
- **npm** 9.x or higher
- **PostgreSQL** database (Neon PostgreSQL recommended)
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NeonSprintMate.git
   cd NeonSprintMate
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Run migrations
   npx knex migrate:latest
   
   # Start development server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   
   # Start development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

### **Environment Variables**

#### **Backend (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgres://user:pass@host/db?sslmode=require

# Security
SESSION_SECRET=your-super-secret-session-key-here
ARCJET_KEY=your-arcjet-key
ARCJET_ENV=development
USE_DB_SESSION=true
```

#### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 Documentation

### **Detailed Documentation**

- 📖 [Frontend Documentation](./frontend/README.md) - Complete frontend guide
- 📖 [Backend Documentation](./backend/README.md) - Complete backend guide
- 📊 [Audit Report](./AUDIT_REPORT.md) - Requirements compliance report

### **API Documentation**

#### **Authentication Endpoints**
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - User login
POST   /api/auth/logout      - User logout
GET    /api/auth/me          - Get current user
```

#### **Team Endpoints**
```
GET    /api/teams            - Get user's teams
POST   /api/teams            - Create team
PUT    /api/teams/:id        - Update team (admin only)
DELETE /api/teams/:id        - Delete team (admin only)
GET    /api/teams/:id/members - Get team members
POST   /api/teams/:id/members - Add member (admin only)
```

#### **Task Endpoints**
```
GET    /api/tasks?team_id=X  - Get tasks for team
POST   /api/tasks            - Create task
PUT    /api/tasks/:id        - Update task
DELETE /api/tasks/:id        - Delete task (creator/admin only)
PATCH  /api/tasks/:id/assign - Assign task
```

---

## 🔒 Security

### **Implemented Security Measures**

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **Session Security** - HTTP-only cookies, secure flag in production
- ✅ **Input Validation** - Express-validator with sanitization
- ✅ **SQL Injection Prevention** - Parameterized queries via Knex
- ✅ **XSS Protection** - Helmet.js security headers
- ✅ **CSRF Protection** - SameSite cookie attribute
- ✅ **Rate Limiting** - Arcjet WAF integration
- ✅ **Role-Based Access** - RBAC for teams and tasks
- ✅ **Authentication Middleware** - Protected routes

---

## 🎯 Roadmap

### **✅ Completed**
- [x] Full authentication system
- [x] Team management with RBAC
- [x] Task CRUD operations
- [x] Advanced filtering system
- [x] Responsive UI design
- [x] Due date reminders
- [x] Email-based member invites

### **🚧 In Progress**
- [ ] Real-time notifications
- [ ] Task comments system
- [ ] File attachments
- [ ] Advanced analytics dashboard

### **📋 Planned**
- [ ] Mobile applications (React Native)
- [ ] WebSocket integration
- [ ] Advanced reporting
- [ ] Integration with external tools

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**

- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Write descriptive commit messages

---

## 📄 License & Usage (PROPRIETARY)

**Copyright (c) 2026 Sameer - All Rights Reserved**

This software is **Source Available** for educational and reference purposes only.
- ❌ **Commercial Use:** STRICTLY FORBIDDEN
- ❌ **Modification:** STRICTLY FORBIDDEN
- ❌ **Distribution:** STRICTLY FORBIDDEN

No license is granted to use this software in any commercial or production environment. See the [LICENSE](LICENSE) file for the full legal terms.

---

## 👨‍💻 Author

**Sameer**

- GitHub: [@Sameer78984](https://github.com/Sameer78984)

---

<div align="center">

### ⭐ **Star this repo if you find it helpful!** ⭐

**Built with ❤️ using React, Node.js, and PostgreSQL**

[⬆ Back to Top](#-neonsprintmate)

</div>
