import { TASK_STATUSES } from "./taskStatus";

export const getTotalTasks = (tasks = []) => tasks.length;

export const getCompletedTasks = (tasks = []) =>
  tasks.filter((task) => task.status === TASK_STATUSES.DONE).length;

export const getInProgressTasks = (tasks = []) =>
  tasks.filter((task) => task.status === TASK_STATUSES.IN_PROGRESS).length;

export const getTodoTasks = (tasks = []) =>
  tasks.filter((task) => task.status === TASK_STATUSES.TODO).length;

export const getHighPriorityTasks = (tasks = []) =>
  tasks.filter((task) => task.priority === "High").length;

export const getPendingTasks = (tasks = []) =>
  tasks.filter((task) => task.status !== TASK_STATUSES.DONE).length;

export const getHighPriorityPendingTasks = (tasks = []) =>
  tasks.filter(
    (task) =>
      task.priority === "High" && task.status !== TASK_STATUSES.DONE
  ).length;

export const getCompletionPercentage = (tasks = []) => {
  const total = getTotalTasks(tasks);
  if (total === 0) return 0;

  return Math.round((getCompletedTasks(tasks) / total) * 100);
};

export const calculateTaskMetrics = (tasks = []) => ({
  totalTasks: getTotalTasks(tasks),
  completedTasks: getCompletedTasks(tasks),
  inProgressTasks: getInProgressTasks(tasks),
  todoTasks: getTodoTasks(tasks),
  highPriorityTasks: getHighPriorityTasks(tasks),
  pendingTasks: getPendingTasks(tasks),
  highPriorityPendingTasks: getHighPriorityPendingTasks(tasks),
  completionPercentage: getCompletionPercentage(tasks),
});
