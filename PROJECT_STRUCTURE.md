# Task Pipeline Manager - Project Structure

## Complete File Organization

```
task-pipeline-manager/
│
├── SETUP.md                          # Complete setup and deployment guide
├── README.md                         # Project overview
│
├── backend/                          # Backend API Server
│   ├── controllers/
│   │   ├── taskController.js         # Task CRUD logic with auto-logging
│   │   └── logController.js          # Activity log handlers
│   │
│   ├── routes/
│   │   ├── taskRoutes.js             # Task API routes (POST, GET, PATCH)
│   │   └── logRoutes.js              # Log API routes (GET)
│   │
│   ├── config/
│   │   └── db.js                     # PostgreSQL connection pool
│   │
│   ├── server.js                     # Express app entry point
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables (port, DB config)
│   ├── .env.example                  # Environment template
│   └── .gitignore                    # Git ignore rules
│
├── frontend/                         # React + Vite Dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx        # Header with branding
│   │   │   │   └── DashboardLayout.jsx # Main container wrapper
│   │   │   │
│   │   │   ├── metrics/
│   │   │   │   └── MetricCard.jsx    # Statistic cards (3 types)
│   │   │   │
│   │   │   └── board/
│   │   │       ├── BoardColumn.jsx   # Kanban column component
│   │   │       └── TaskCard.jsx      # Individual task card
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx         # Main dashboard page
│   │   │
│   │   ├── data/
│   │   │   └── mockTasks.js          # Mock data (12 tasks + activity log)
│   │   │
│   │   ├── App.jsx                   # Root React component
│   │   ├── main.jsx                  # React DOM entry point
│   │   └── index.css                 # Global Tailwind styles
│   │
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite build configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── README.md                     # Frontend documentation
│   ├── .gitignore                    # Git ignore rules
│   └── .env.local                    # Local environment (optional)
│
└── database/
    └── schema.sql                    # PostgreSQL schema with sample data
```

## File Count Summary

| Category | Count |
|----------|-------|
| Backend Controllers | 2 |
| Backend Routes | 2 |
| Frontend Components | 6 |
| Frontend Pages | 1 |
| Configuration Files | 5 |
| Documentation | 4 |
| **Total** | **25** |

## Key Files Description

### Backend Files

| File | Purpose | Lines |
|------|---------|-------|
| server.js | Express server setup, route mounting | ~45 |
| taskController.js | Task CRUD + auto-logging | ~180 |
| logController.js | Activity log retrieval | ~40 |
| taskRoutes.js | Task API endpoint definitions | ~10 |
| logRoutes.js | Log API endpoint definitions | ~8 |
| config/db.js | PostgreSQL connection pooling | ~15 |

### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| Dashboard.jsx | Main page with all sections | ~150 |
| Navbar.jsx | Header navigation component | ~45 |
| MetricCard.jsx | Statistics display component | ~30 |
| BoardColumn.jsx | Kanban column component | ~40 |
| TaskCard.jsx | Individual task component | ~35 |
| mockTasks.js | Mock data (12 tasks + 6 logs) | ~80 |

## API Endpoints

### Health Check
```
GET /
```

### Task Management
```
POST   /api/tasks        Create task
GET    /api/tasks        Get all tasks
GET    /api/tasks/:id    Get single task
PATCH  /api/tasks/:id    Update task
```

### Activity Logs
```
GET    /api/logs         Get all activity logs
```

## Component Hierarchy

```
App
 └── Dashboard
      ├── Navbar
      ├── DashboardLayout
      │    ├── Header Section
      │    ├── Metrics Section
      │    │    ├── MetricCard (Total Tasks)
      │    │    ├── MetricCard (Completed)
      │    │    └── MetricCard (High Priority)
      │    ├── Kanban Board
      │    │    ├── BoardColumn (To Do)
      │    │    │    └── TaskCard x N
      │    │    ├── BoardColumn (In Progress)
      │    │    │    └── TaskCard x N
      │    │    └── BoardColumn (Done)
      │    │         └── TaskCard x N
      │    └── Recent Activity Section
      │         └── Activity Timeline
```

## Database Schema

### tasks table
```sql
id (SERIAL PRIMARY KEY)
title (VARCHAR NOT NULL)
description (TEXT)
priority (VARCHAR CHECK: High, Medium, Low)
status (VARCHAR DEFAULT 'To Do')
created_at (TIMESTAMP DEFAULT NOW())
```

### logs table
```sql
id (SERIAL PRIMARY KEY)
task_id (INTEGER FK → tasks.id ON DELETE CASCADE)
action (VARCHAR NOT NULL)
old_status (VARCHAR)
new_status (VARCHAR)
created_at (TIMESTAMP DEFAULT NOW())
```

## Frontend Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column (1 col) |
| Tablet | 640px-1024px | Two columns (2 col) |
| Desktop | > 1024px | Three columns (3 col) |

## Color Palette

### Primary Colors
- Light Blue: `#3B82F6` - Main brand color
- Very Light Blue: `#EAF4FF` - Light backgrounds
- White: `#FFFFFF` - Card backgrounds

### Accent Colors
- Soft Orange: `#F97316` - High priority, In Progress
- Light Orange: `#FDBA74` - Lighter accents

### Status Colors
- Green: `#10B981` - Done/Success
- Blue: `#3B82F6` - To Do/Pending
- Gray: `#6B7280` - Neutral

## Features Implemented

### Backend
- ✅ Express.js server with CORS
- ✅ PostgreSQL connection pooling
- ✅ Task CRUD operations
- ✅ Automatic activity logging
- ✅ Parameterized SQL queries
- ✅ Error handling and validation
- ✅ Health check endpoint

### Frontend
- ✅ Responsive design (mobile-first)
- ✅ Modern UI with Tailwind CSS
- ✅ Kanban board layout
- ✅ Metrics dashboard
- ✅ Activity timeline
- ✅ Mock data integration
- ✅ Component-based architecture
- ✅ Smooth transitions and hover effects

## Development Workflow

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev     # Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev     # Runs on http://localhost:5173

# Browser
Navigate to http://localhost:5173
```

## Production Build

```bash
# Backend
npm run build   # Uses package.json "start" script

# Frontend
npm run build   # Creates dist/ folder
npm run preview # Preview production build
```

## Dependencies Overview

### Backend (5 core + 1 dev)
- express (framework)
- pg (database)
- cors (middleware)
- dotenv (config)
- nodemon (dev)

### Frontend (3 core + 4 dev)
- react (framework)
- react-dom (renderer)
- tailwindcss (styling)
- vite (bundler)
- autoprefixer (CSS)
- postcss (CSS transformer)

---

**Total Production-Ready Components: 25+ files**
**Total Lines of Code: ~800+ (excluding node_modules)**
