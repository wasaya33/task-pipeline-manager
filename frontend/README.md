# Task Pipeline Manager - Frontend

A modern, responsive React dashboard for managing tasks with activity tracking and API integration.

## Features

- ✨ Modern, clean UI with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- 📊 Metrics dashboard with real task data
- 🎯 Kanban-style task board
- 📝 Activity timeline with real activity logs
- 🎨 Professional color scheme
- ⚡ Fast and lightweight with Vite
- 🔌 Integrated with REST API using Axios
- 📡 Real-time data loading from backend

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **JavaScript (ES6+)** - Language

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx              # Navigation header
│   │   └── DashboardLayout.jsx      # Main layout wrapper
│   ├── metrics/
│   │   └── MetricCard.jsx           # Metric statistics cards
│   └── board/
│       ├── BoardColumn.jsx          # Kanban column component
│       └── TaskCard.jsx             # Individual task card
├── pages/
│   └── Dashboard.jsx                # Main dashboard page
├── services/
│   ├── api.js                       # Axios instance configuration
│   └── taskService.js               # API service functions
├── hooks/
│   └── useTasks.js                  # Custom hook for task management
├── data/
│   └── mockTasks.js                 # Mock data for fallback
├── App.jsx                          # Root component
├── main.jsx                         # Entry point
└── index.css                        # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running on http://localhost:5000

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

Create a `.env.local` file in the frontend directory (copy from `.env.example`):

```bash
# .env.local
VITE_API_URL=http://localhost:5000
```

This configures the API endpoint for the backend. Update if your backend is running on a different URL.

### Backend Setup Required

Before running the frontend, ensure the backend is running:

```bash
cd backend
npm install
npm run dev
```

The backend should be available at `http://localhost:5000`

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

The frontend will automatically fetch data from the backend API. Make sure the backend is running!

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## API Integration

### Architecture

The frontend uses a clean, modular API architecture:

1. **API Instance** (`src/services/api.js`)
   - Reusable Axios instance with baseURL configuration
   - Request/response interceptors for error handling
   - Environment variable support

2. **API Service** (`src/services/taskService.js`)
   - Encapsulates all API calls
   - Functions: `getAllTasks()`, `getTaskById()`, `updateTask()`, `getAllLogs()`
   - Error handling and logging

3. **Custom Hook** (`src/hooks/useTasks.js`)
   - Manages task state and loading states
   - `useTasks()` hook provides tasks, logs, loading, error, and refreshTasks

### Available API Endpoints

The frontend connects to these backend endpoints:

```
GET    /api/tasks              # Get all tasks
GET    /api/tasks/:id          # Get single task
PATCH  /api/tasks/:id          # Update task
GET    /api/logs               # Get activity logs
```

### State Management

The `useTasks` hook manages:

```javascript
{
  tasks: [],           // Array of task objects
  logs: [],           // Array of activity logs
  loading: false,     // Loading state during API calls
  error: null,        // Error message if API fails
  refreshTasks: ()    // Function to refetch data
}
```

### Error Handling

The frontend handles:

- Network errors (backend not running)
- API response errors
- Invalid task IDs
- Timeout errors

User-friendly error messages are displayed in the UI.

### Loading States

During API calls, the dashboard shows:

- Skeleton loaders for metrics cards
- Skeleton loaders for task cards
- Loading spinner message

## Color Scheme

- **Primary Blue**: `#3B82F6`
- **Primary Light Blue**: `#EAF4FF`
- **Accent Orange**: `#F97316`
- **Accent Light Orange**: `#FDBA74`
- **Success Green**: `#10B981`
- **Neutral Gray**: `#6B7280`

## Responsive Breakpoints

- **Mobile**: < 640px (single column layouts)
- **Tablet**: 640px - 1024px (2 column layouts)
- **Desktop**: > 1024px (3 column layouts)

## Component Documentation

### Navbar

Navigation header with application branding and quick links.

### MetricCard

Displays key statistics with icons and color-coded accents.

**Props:**
- `title` - Card title
- `value` - Metric value
- `icon` - React component for icon
- `color` - 'blue' | 'green' | 'orange'

### BoardColumn

Kanban board column for organizing tasks by status.

**Props:**
- `title` - Column header
- `color` - 'blue' | 'orange' | 'green'
- `tasks` - Array of task objects

### TaskCard

Individual task card with priority and status.

**Props:**
- `task` - Task object with id, title, description, priority, status

## Mock Data

The dashboard uses static mock data from `src/data/mockTasks.js`. To connect to real APIs, update the component state management and data fetching logic.

## Future Enhancements

- [ ] API integration with backend
- [ ] Real-time data updates
- [ ] Task filtering and search
- [ ] Drag-and-drop functionality
- [ ] User authentication
- [ ] Dark mode toggle
- [ ] Export reports

## License

MIT
