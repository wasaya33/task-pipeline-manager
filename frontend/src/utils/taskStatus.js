import { getNetworkErrorMessage } from "./networkError";

export const TASK_STATUSES = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export const STATUS_TRANSITIONS = {
  [TASK_STATUSES.TODO]: {
    nextStatus: TASK_STATUSES.IN_PROGRESS,
    label: "Move to In Progress",
    buttonClass:
      "bg-primary hover:bg-blue-600 text-white",
  },
  [TASK_STATUSES.IN_PROGRESS]: {
    nextStatus: TASK_STATUSES.DONE,
    label: "Move to Done",
    buttonClass:
      "bg-green-600 hover:bg-green-700 text-white",
  },
  [TASK_STATUSES.DONE]: {
    nextStatus: TASK_STATUSES.IN_PROGRESS,
    label: "Move Back to In Progress",
    buttonClass:
      "bg-gray-600 hover:bg-gray-700 text-white",
  },
};

export const getStatusTransition = (status) =>
  STATUS_TRANSITIONS[status] ?? null;

export const getTaskUpdateErrorMessage = (error) =>
  getNetworkErrorMessage(error, "Failed to update task status. Please try again.");
