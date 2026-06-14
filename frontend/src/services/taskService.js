import api from "./api";

/**
 * Task Service - API calls for task management
 */

// Fetch all tasks
export const getAllTasks = async () => {
  try {
    const response = await api.get("/api/tasks");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Fetch single task by ID
export const getTaskById = async (id) => {
  try {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

// Create new task
export const createTask = async (data) => {
  try {
    const response = await api.post("/api/tasks", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Update task
export const updateTask = async (id, data) => {
  try {
    const response = await api.patch(`/api/tasks/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

// Fetch all activity logs
export const getAllLogs = async () => {
  try {
    const response = await api.get("/api/logs");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};
