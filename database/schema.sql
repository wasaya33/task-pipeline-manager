-- Task Pipeline Manager Database Schema
-- Production-ready PostgreSQL schema

-- ==========================================
-- TABLE: tasks
-- ==========================================
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('High', 'Medium', 'Low')),
  status VARCHAR(50) DEFAULT 'To Do',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

-- ==========================================
-- TABLE: logs
-- ==========================================
CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on task_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_logs_task_id ON logs(task_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);

-- ==========================================
-- SAMPLE DATA (optional, for testing)
-- ==========================================

-- Insert sample tasks
INSERT INTO tasks (title, description, priority, status)
VALUES
  (
    'Design Dashboard UI',
    'Create mockups and design the activity log dashboard interface',
    'High',
    'In Progress'
  ),
  (
    'Setup PostgreSQL Database',
    'Configure database schema and establish connection pooling',
    'High',
    'Completed'
  ),
  (
    'Write API Endpoints',
    'Create REST API endpoints for task management',
    'Medium',
    'To Do'
  )
ON CONFLICT DO NOTHING;

-- Insert sample activity logs
INSERT INTO logs (task_id, action, old_status, new_status)
VALUES
  (
    1,
    'Task created',
    NULL,
    'To Do'
  ),
  (
    1,
    'Status updated',
    'To Do',
    'In Progress'
  ),
  (
    2,
    'Task created',
    NULL,
    'To Do'
  ),
  (
    2,
    'Status updated',
    'To Do',
    'Completed'
  )
ON CONFLICT DO NOTHING;
