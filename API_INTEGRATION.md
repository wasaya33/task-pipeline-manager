# Frontend API Integration Guide

## Overview

The Task Pipeline Manager frontend has been fully integrated with the backend REST API using Axios and custom React hooks.

## Architecture

### 1. API Configuration (`src/services/api.js`)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});
```

**Features:**
- Reusable Axios instance
- Environment variable configuration
- Request/response interceptors
- Automatic error handling

### 2. Task Service (`src/services/taskService.js`)

Provides API functions:

```javascript
getAllTasks()          // GET /api/tasks
getTaskById(id)        // GET /api/tasks/:id
updateTask(id, data)   // PATCH /api/tasks/:id
getAllLogs()           // GET /api/logs
```

All functions use async/await and include error handling.

### 3. Custom Hook (`src/hooks/useTasks.js`)

```javascript
const { tasks, logs, loading, error, refreshTasks } = useTasks();
```

**Features:**
- Automatic data fetching on mount
- Loading and error states
- Parallel requests (tasks + logs)
- Refresh function for manual updates

### 4. Dashboard Integration

The Dashboard component now:
- Uses `useTasks()` hook for data management
- Shows loading skeletons while fetching
- Displays error messages with retry button
- Filters tasks by status dynamically
- Calculates metrics from real data
- Shows real activity log timeline

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This installs Axios and all other dependencies.

### 2. Configure Environment

Create `.env.local`:

```bash
VITE_API_URL=http://localhost:5000
```

Or copy from `.env.example`:

```bash
cp .env.example .env.local
```

### 3. Start Backend

Before running frontend, start the backend:

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### 4. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` and automatically connects to the backend.

## API Flow

```
User opens dashboard
         ↓
useTasks hook runs useEffect
         ↓
Fetch tasks + logs in parallel
         ↓
API calls to backend
         ↓
Parse response data
         ↓
Update state (tasks, logs, loading, error)
         ↓
Dashboard re-renders with real data
```

## Data Flow

### Task List

1. Backend provides: `/api/tasks`
2. Frontend fetches with: `getAllTasks()`
3. Hook stores in: `tasks` state
4. Dashboard filters by status
5. Displays in Kanban columns

### Activity Logs

1. Backend provides: `/api/logs`
2. Frontend fetches with: `getAllLogs()`
3. Hook stores in: `logs` state
4. Dashboard displays recent activities
5. Shows action + timestamp

### Metrics

Calculated dynamically from fetched data:

```javascript
Total Tasks = tasks.length
Completed = tasks.filter(t => t.status === "Done").length
High Priority = tasks.filter(t => t.priority === "High").length
```

## Error Handling

### Network Errors

If backend is not running:

```
Error Message: "No response from server. Please check if backend is running."
UI: Red error card with retry button
```

### API Errors

If API returns error:

```
Error Message: Displayed from server response
UI: Red error card with error details
```

### Timeout

If request takes > 10 seconds:

```
Error Message: "Request timeout. Server may be slow or unresponsive."
UI: Error state displayed
```

## Loading States

### Initial Load

Shows skeleton loaders:

```
[Skeleton Card] [Skeleton Card] [Skeleton Card]
[Skeleton Task] [Skeleton Task] [Skeleton Task]
```

### After Load

Displays real data:

```
[Metric] [Metric] [Metric]
[Task]   [Task]   [Task]
```

### Error

Shows error message with retry:

```
❌ Failed to Load Tasks
[Error details]
[Retry Button]
```

## Updating Data

### Manual Refresh

Call `refreshTasks()` to reload data:

```javascript
const { refreshTasks } = useTasks();

<button onClick={refreshTasks}>Refresh</button>
```

### Auto-refresh

Currently loads on component mount. To add periodic refresh:

```javascript
useEffect(() => {
  const interval = setInterval(refreshTasks, 30000); // Every 30 seconds
  return () => clearInterval(interval);
}, [refreshTasks]);
```

## Environment Variables

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)

```
PORT=5000
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_pipeline
```

## Troubleshooting

### "No response from server"

**Issue:** Backend is not running
**Solution:** Start backend with `npm run dev` in backend folder

### "CORS Error"

**Issue:** Backend CORS not configured
**Solution:** Check backend has CORS enabled in Express

### "Cannot find module 'axios'"

**Issue:** Axios not installed
**Solution:** Run `npm install` in frontend folder

### "API returns 404"

**Issue:** API endpoint not found
**Solution:** Check backend endpoint names in api.js

### "Data not updating"

**Issue:** Stale state or cache
**Solution:** Click Retry button or refresh page

## Code Quality

✅ Async/await throughout
✅ Proper error handling
✅ Reusable API functions
✅ Clean component separation
✅ Loading states
✅ Error messages
✅ Type-safe params
✅ Environment variables

## Performance

- Parallel requests (Promise.all)
- Axios timeout (10 seconds)
- Skeleton loaders for UX
- Minimal re-renders
- Efficient state management

## Security

- Parameterized API calls
- No sensitive data in localStorage
- HTTPS ready (when deployed)
- CORS configured on backend
- Input validation on backend

## Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Offline support with local cache
- [ ] Request retry logic
- [ ] API request logging
- [ ] Data pagination
- [ ] Advanced error recovery

## Testing API Manually

### Health Check
```bash
curl http://localhost:5000/
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Get Activity Logs
```bash
curl http://localhost:5000/api/logs
```

### Update Task
```bash
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Done"}'
```

## Summary

The frontend now:
✅ Connects to backend API via Axios
✅ Fetches real task data
✅ Displays real activity logs
✅ Shows loading states
✅ Handles errors gracefully
✅ Manages state with custom hook
✅ Calculates metrics dynamically
✅ Refreshes data on demand
✅ Uses environment variables
✅ Follows React best practices

Ready for production deployment!
