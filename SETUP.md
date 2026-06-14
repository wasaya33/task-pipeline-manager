# Task Pipeline Manager - Complete Setup Guide

This is a full-stack Task Management and Activity Logging system with a modern frontend and production-ready backend.

## 📋 Project Overview

**Task Pipeline Manager & Activity Log Dashboard** is a complete application consisting of:

1. **Backend API** (Node.js + Express + PostgreSQL)
2. **Frontend Dashboard** (React + Vite + Tailwind CSS)
3. **Database Schema** (PostgreSQL with tasks and activity logs)

## 🏗️ Project Structure

```
task-pipeline-manager/
│
├── backend/                    # Node.js + Express API
│   ├── controllers/            # Business logic
│   │   ├── taskController.js
│   │   └── logController.js
│   ├── routes/                 # API endpoints
│   │   ├── taskRoutes.js
│   │   └── logRoutes.js
│   ├── config/                 # Configuration
│   │   └── db.js
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Layout components
│   │   │   ├── metrics/        # Metric cards
│   │   │   └── board/          # Kanban board
│   │   ├── pages/              # Page components
│   │   ├── data/               # Mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
└── database/                   # Database schema
    └── schema.sql              # PostgreSQL DDL
```

## 🚀 Quick Start

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Environment Variables**
   
   Create a `.env` file (already exists):
   ```
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_pipeline
   ```

3. **Initialize Database**
   ```bash
   psql -U postgres -d task_pipeline -f ../database/schema.sql
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Dashboard runs on `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🛠️ Backend Modules

### Module 1: Foundation ✅
- Express server setup
- CORS enabled
- JSON middleware
- PostgreSQL connection pooling
- Health check route: `GET /`

### Module 2: Database Schema ✅
- **tasks** table: id, title, description, priority, status, created_at
- **logs** table: id, task_id, action, old_status, new_status, created_at
- Foreign key relationship with ON DELETE CASCADE
- Optimized indexes for performance

### Module 3: CRUD API ✅
**Endpoints:**
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `PATCH /api/tasks/:id` - Update task

**Response Format:**
```json
{
  "success": true,
  "data": { /* task data */ }
}
```

### Module 4: Activity Logging ✅
- Automatic logging on task creation
- Automatic logging on status changes
- `GET /api/logs` - Retrieve all activity logs

**Log Actions:**
- `TASK_CREATED` - When task is created
- `STATUS_UPDATED` - When task status changes
- `TASK_UPDATED` - When other fields change

## 🎨 Frontend Features

### Responsive Design
- **Mobile First** approach
- **Tablet** optimized
- **Desktop** enhanced layouts

### Components
- **Navbar** - Application header with branding
- **DashboardLayout** - Main container
- **MetricCard** - Statistics display (3 cards)
- **BoardColumn** - Kanban columns (3 columns)
- **TaskCard** - Individual task display

### Dashboard Sections
1. **Header** - Welcome message
2. **Metrics** - Total tasks, completed, high priority
3. **Kanban Board** - To Do, In Progress, Done columns
4. **Activity Timeline** - Recent activity log

### Color Scheme
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Light Blue | #3B82F6 |
| Primary Light | Very Light Blue | #EAF4FF |
| Accent | Soft Orange | #F97316 |
| Accent Light | Light Orange | #FDBA74 |
| Success | Green | #10B981 |

## 🧪 Testing the Backend

### Health Check
```bash
curl http://localhost:5000/
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Task description",
    "priority": "High"
  }'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Update Task
```bash
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```

### Get Activity Logs
```bash
curl http://localhost:5000/api/logs
```

## 📦 Dependencies

### Backend
- **express** - Web framework
- **pg** - PostgreSQL client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **nodemon** - Auto-reload (dev)

### Frontend
- **react** - UI framework
- **vite** - Build tool
- **tailwindcss** - Styling
- **autoprefixer** - CSS processing
- **postcss** - CSS transformation

## 🔧 Configuration Files

### Backend
- `server.js` - Express app configuration
- `config/db.js` - PostgreSQL connection
- `.env` - Environment variables
- `package.json` - Dependencies

### Frontend
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML entry point

### Database
- `database/schema.sql` - Database schema with sample data

## 🚀 Deployment Checklist

- [ ] Update `.env` with production credentials
- [ ] Run database migrations
- [ ] Build frontend: `npm run build`
- [ ] Start backend: `npm start` (after updating package.json)
- [ ] Configure CORS for frontend domain
- [ ] Setup CI/CD pipeline
- [ ] Configure environment variables on production

## 📖 API Documentation

### Health Check
```
GET /
Returns: {success: true, message: "Server and Database Connected", time: "2026-06-12..."}
```

### Task Endpoints
```
POST /api/tasks
  Body: {title, description, priority}
  Returns: {success: true, data: {id, title, ...}}

GET /api/tasks
  Returns: {success: true, data: [{...}, {...}]}

GET /api/tasks/:id
  Returns: {success: true, data: {...}}

PATCH /api/tasks/:id
  Body: {title?, description?, priority?, status?}
  Returns: {success: true, data: {...}}
```

### Log Endpoints
```
GET /api/logs
  Returns: {success: true, data: [{id, task_id, action, old_status, new_status, task_title, ...}]}
```

## 🎓 Learning Resources

- React Documentation: https://react.dev
- Vite Guide: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Express.js: https://expressjs.com
- PostgreSQL: https://www.postgresql.org/docs

## 🐛 Troubleshooting

### Backend Won't Start
- Check if PostgreSQL is running
- Verify `.env` file exists and has correct credentials
- Check if port 5000 is available

### Frontend Build Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

### Database Connection Failed
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure `task_pipeline` database exists

## 📝 Future Enhancements

- [ ] API integration in frontend
- [ ] User authentication
- [ ] Real-time updates with WebSockets
- [ ] Drag-and-drop task management
- [ ] Email notifications
- [ ] Dark mode
- [ ] Export reports
- [ ] Task filtering and search
- [ ] Team collaboration features

## ✅ Completed Modules

- ✅ Module 1: Backend Foundation
- ✅ Module 2: Database Schema
- ✅ Module 3: Task CRUD API
- ✅ Module 4: Activity Logging
- ✅ Module 5: Frontend Dashboard

## 📄 License

MIT

---

**Happy coding!** 🚀
