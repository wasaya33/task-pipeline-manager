import { getNetworkErrorMessage } from "./networkError";

export const ACTION_LABELS = {
  TASK_CREATED: "Task Created",
  STATUS_UPDATED: "Status Changed",
  TASK_UPDATED: "Task Updated",
};

export const getActionLabel = (action) =>
  ACTION_LABELS[action] ?? action.replace(/_/g, " ");

export const getActionBadgeClass = (action) => {
  const styles = {
    TASK_CREATED: "bg-green-100 text-green-700",
    STATUS_UPDATED: "bg-primary-light text-primary",
    TASK_UPDATED: "bg-orange-100 text-accent",
  };

  return styles[action] ?? "bg-gray-100 text-gray-700";
};

export const formatLogTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  return {
    date: date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export const formatStatus = (status) => status ?? "—";

export const sortLogsByDateDesc = (logs) =>
  [...logs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

export const getLogsErrorMessage = (error) =>
  getNetworkErrorMessage(error, "Failed to load activity logs. Please try again.");
