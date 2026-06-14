import { useState, useEffect } from "react";
import {
  getAllTasks,
  getAllLogs,
  updateTask,
} from "../services/taskService";
import { getTaskUpdateErrorMessage } from "../utils/taskStatus";
import { getNetworkErrorMessage } from "../utils/networkError";

/**
 * Custom Hook: useTasks
 * Manages task data, loading state, and error handling
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingTaskIds, setUpdatingTaskIds] = useState({});
  const [taskUpdateErrors, setTaskUpdateErrors] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tasksData, logsData] = await Promise.all([
        getAllTasks(),
        getAllLogs(),
      ]);

      setTasks(tasksData);
      setLogs(logsData);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(
        getNetworkErrorMessage(
          err,
          "Failed to load tasks. Please check if the backend server is running."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    await fetchTasks();
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const previousTasks = tasks;

    setUpdatingTaskIds((prev) => ({ ...prev, [taskId]: true }));
    setTaskUpdateErrors((prev) => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const updatedTask = await updateTask(taskId, { status: newStatus });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );

      const logsData = await getAllLogs();
      setLogs(logsData);

      return { success: true };
    } catch (err) {
      console.error(`Failed to update task ${taskId}:`, err);
      setTasks(previousTasks);

      const message = getTaskUpdateErrorMessage(err);
      setTaskUpdateErrors((prev) => ({ ...prev, [taskId]: message }));

      return { success: false, error: message };
    } finally {
      setUpdatingTaskIds((prev) => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });
    }
  };

  return {
    tasks,
    logs,
    loading,
    error,
    updatingTaskIds,
    taskUpdateErrors,
    refreshTasks,
    updateTaskStatus,
  };
};
