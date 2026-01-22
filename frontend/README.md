<div align="center">

# 🎨 NeonSprintMate Frontend

### **Modern React Application with Feature-Based Architecture**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.10-FF6B6B?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

**A beautifully designed, production-ready React application with modern architecture patterns**

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [📦 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Feature Modules](#-feature-modules)
- [🎨 Component Library](#-component-library)
- [🔄 State Management](#-state-management)
- [🎯 Best Practices](#-best-practices)

---

## 🌟 Overview

The NeonSprintMate frontend is a **feature-based, modular React application** built with modern development practices. It provides a seamless, responsive user experience with beautiful animations and intuitive interactions.

### **Key Characteristics**

- ✅ **Feature-Based Architecture** - Organized by business domains
- ✅ **Component Reusability** - Shared component library
- ✅ **Custom Hooks** - Extracted business logic
- ✅ **Type-Safe Patterns** - Ready for TypeScript migration
- ✅ **Performance Optimized** - Code splitting, memoization
- ✅ **Accessible** - WCAG-compliant components

---

## ✨ Features

### **🎯 Core Functionality**

- **Authentication Flow**
  - Secure login/register forms
  - Protected routes with redirects
  - Session persistence
  - Error handling with field-level feedback

- **Dashboard Interface**
  - Responsive sidebar navigation
  - Mobile-friendly slide-over menu
  - User profile section
  - Real-time status updates

- **Task Management**
  - Interactive task board
  - Create/Edit task modals
  - Advanced filtering (status, assignee, search)
  - Task cards with hover effects
  - Quick action menu

- **Team Management**
  - Team creation modal
  - Member invitation system
  - Team roster display
  - Role-based UI indicators

- **Landing Page**
  - Animated hero section
  - Feature showcase
  - Responsive design
  - Smooth scroll animations

---

## 🏗️ Architecture

### **Feature-Based Structure**

```
src/
├── features/              # Business feature modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── hooks/         # Auth business logic
│   │   └── pages/         # Auth pages
│   ├── dashboard/         # Dashboard feature
│   ├── landing/           # Landing page feature
│   ├── tasks/             # Task management feature
│   └── teams/             # Team management feature
│
├── components/            # Shared UI components
│   ├── Button.jsx         # Reusable button
│   ├── Input.jsx          # Form input component
│   ├── Modal.jsx          # Modal wrapper
│   ├── Toast.jsx          # Notification component
│   └── NeonSelect.jsx     # Custom dropdown
│
├── stores/               # Zustand state stores
│   ├── useAuthStore.js    # Authentication state
│   ├── useTaskStore.js    # Task state
│   ├── useTeamStore.js    # Team state
│   └── useToastStore.js  # Toast notifications
│
├── lib/                  # External library configs
│   └── axios.js          # HTTP client setup
│
└── utils/                # Utility functions
    └── formatDate.js     # Date formatting
```

### **Component Hierarchy**

```
App
├── Routes
│   ├── LandingPage
│   ├── LoginPage
│   │   └── LoginForm
│   ├── RegisterPage
│   │   └── RegisterForm
│   └── ProtectedRoute
│       └── DashboardLayout
│           ├── DashboardSidebar
│           ├── DashboardMobileMenu
│           └── Outlet
│               ├── TaskBoard
│               │   ├── TaskBoardHeader
│               │   ├── MatrixFilters
│               │   └── TaskGrid
│               │       └── TaskCard
│               └── TeamSettings
│                   ├── TeamInviteSection
│                   └── MemberCard
└── Toast Portal
```

---

## 📦 Project Structure

### **Feature Modules**

#### **🔐 Auth Feature** (`features/auth/`)

**Components:**
- `LoginForm.jsx` - Login form with validation
- `RegisterForm.jsx` - Registration form
- `AuthFormHeader.jsx` - Reusable form header
- `AuthFormFooter.jsx` - Form footer with links
- `ProtectedRoute.jsx` - Route protection wrapper

**Hooks:**
- `useAuthForm.js` - Authentication form logic

**Pages:**
- `LoginPage.jsx` - Login page wrapper
- `RegisterPage.jsx` - Register page wrapper

#### **📊 Dashboard Feature** (`features/dashboard/`)

**Components:**
- `DashboardLayout.jsx` - Main layout container
- `DashboardSidebar.jsx` - Desktop navigation
- `DashboardMobileHeader.jsx` - Mobile header
- `DashboardMobileMenu.jsx` - Mobile slide menu
- `DashboardUserSection.jsx` - User profile section
- `MatrixFilters.jsx` - Search and filter controls
- `TaskActionMenu.jsx` - Task quick actions

#### **📋 Tasks Feature** (`features/tasks/`)

**Components:**
- `TaskBoard.jsx` - Main task board container
- `TaskBoardHeader.jsx` - Board header with actions
- `TaskGrid.jsx` - Task grid layout
- `TaskCard.jsx` - Individual task card
- `CreateTaskModal.jsx` - Task creation modal
- `EditTaskModal.jsx` - Task editing modal

**Hooks:**
- `useTaskFilters.js` - Task filtering logic
- `useTaskForm.js` - Task form management

**Utils:**
- `constants.js` - Task-related constants

#### **👥 Teams Feature** (`features/teams/`)

**Components:**
- `TeamSettings.jsx` - Team settings page
- `TeamInviteSection.jsx` - Member invitation form
- `MemberCard.jsx` - Team member display card
- `CreateTeamModal.jsx` - Team creation modal

#### **🏠 Landing Feature** (`features/landing/`)

**Components:**
- `LandingPage.jsx` - Main landing page
- `LandingHero.jsx` - Hero section
- `LandingBackground.jsx` - Animated background
- `LandingStatusBar.jsx` - Status bar
- `LandingVision.jsx` - Vision statement
- `FeatureSphere.jsx` - Feature showcase orb

**Utils:**
- `animations.js` - Animation variants

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|:--------|:--------|:--------|
| **react** | 19.2.0 | UI Framework |
| **react-dom** | 19.2.0 | DOM rendering |
| **react-router-dom** | 7.12.0 | Client-side routing |
| **vite** | 7.2.4 | Build tool & dev server |
| **zustand** | 5.0.10 | State management |
| **axios** | 1.13.2 | HTTP client |
| **framer-motion** | 12.27.3 | Animation library |
| **tailwindcss** | 4.1.18 | Utility-first CSS |
| **daisyui** | 5.5.14 | Component library |
| **clsx** | 2.1.1 | Conditional classnames |

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20.x or higher
- npm 9.x or higher

### **Installation**

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173 in your browser

### **Available Scripts**

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 📁 Feature Modules

### **Component Patterns**

#### **Atomic Components**
- **Atoms**: Basic UI elements (Button, Input)
- **Molecules**: Composed components (Modal, Form)
- **Organisms**: Complex components (TaskCard, DashboardLayout)

#### **Feature Components**
- Scoped to specific business domains
- Self-contained with related hooks/utils
- Reusable across the application

### **Custom Hooks**

#### **useAuthForm**
```javascript
const { formData, handleChange, handleSubmit, loading, errorField } = 
  useAuthForm(initialData, 'login');
```

#### **useTaskFilters**
```javascript
const filteredTasks = useTaskFilters(tasks, searchQuery, statusFilter, assigneeFilter);
```

#### **useTaskForm**
```javascript
const { formData, setFormData, handleSubmit, loading, members } = 
  useTaskForm(initialData, isOpen, onSuccess);
```

---

## 🎨 Component Library

### **Shared Components**

#### **Button Component**
```jsx
<Button 
  variant="cyan" 
  loading={isLoading}
  onClick={handleClick}
>
  Click Me
</Button>
```

**Props:**
- `variant`: `'cyan' | 'purple' | 'outline'`
- `loading`: `boolean`
- `disabled`: `boolean`
- `type`: `'button' | 'submit'`

#### **Input Component**
```jsx
<Input
  label="Email Address"
  icon={EnvelopeIcon}
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error}
  isErrorField={hasError}
  required
/>
```

#### **Modal Component**
```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  maxWidth="max-w-lg"
  zIndex={200}
  accentColor="cyan"
>
  <ModalHeader 
    icon={Icon} 
    title="Modal Title" 
    onClose={onClose} 
  />
  {/* Modal content */}
</Modal>
```

#### **Toast Component**
```jsx
// Automatically displayed via useToastStore
addToast("Success message", "cyan");
addToast("Error message", "error");
```

---

## 🔄 State Management

### **Zustand Stores**

#### **useAuthStore**
```javascript
const { 
  user, 
  isAuthenticated, 
  login, 
  register, 
  logout,
  loading,
  errorField 
} = useAuthStore();
```

**Features:**
- User session management
- Authentication state
- Error field tracking
- Persistent storage

#### **useTaskStore**
```javascript
const {
  tasks,
  loading,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  clearTasks
} = useTaskStore();
```

**Features:**
- Task CRUD operations
- Optimistic updates
- Team-based filtering
- Persistent storage

#### **useTeamStore**
```javascript
const {
  teams,
  currentTeam,
  members,
  fetchTeams,
  createTeam,
  addMember,
  setCurrentTeam
} = useTeamStore();
```

**Features:**
- Team management
- Member roster
- Current team selection
- Auto-fetch on team change

#### **useToastStore**
```javascript
const { toasts, addToast, removeToast } = useToastStore();
```

**Features:**
- Global toast notifications
- Multiple toast support
- Auto-dismiss
- Animation support

---

## 🎯 Best Practices

### **Code Organization**

1. **Feature-Based Structure**
   - Group related components, hooks, and utils
   - Keep features self-contained
   - Share only truly reusable components

2. **Component Design**
   - Single Responsibility Principle
   - Props over global state
   - Named exports for better tree-shaking

3. **State Management**
   - Use Zustand for global state
   - Local state for component-specific data
   - Custom hooks for complex logic

4. **Performance**
   - Memoization with `useMemo` and `useCallback`
   - Code splitting with React.lazy
   - Optimistic UI updates

### **Styling Guidelines**

- Use Tailwind utility classes
- Custom classes in `index.css` for complex patterns
- Responsive design with mobile-first approach
- Consistent spacing and typography

### **Accessibility**

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management

---

## 🎨 Design System

### **Color Palette**

```css
/* Neon Theme Colors */
--neon-cyan: #22d3ee
--neon-purple: #a855f7
--deep-black: #050505
--zinc-500: #71717a
```

### **Typography**

- **Font Family**: System fonts (sans-serif)
- **Headings**: Bold, uppercase, tracking-tighter
- **Body**: Regular weight, relaxed leading
- **Code**: Mono font for technical text

### **Spacing**

- Consistent spacing scale (4px base unit)
- Responsive padding/margins
- Container max-widths for readability

---

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### **Mobile Features**

- Slide-over navigation menu
- Touch-optimized interactions
- Responsive grid layouts
- Mobile-first component design

---

## 🐛 Troubleshooting

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Module Not Found**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Errors**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">

### **Built with ❤️ using React and Vite**

[⬆ Back to Top](#-neonsprintmate-frontend)

</div>
