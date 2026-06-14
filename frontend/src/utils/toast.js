import toast from "react-hot-toast";

export const TOAST_MESSAGES = {
  TASK_CREATED: "Task created successfully",
  TASK_UPDATED: "Task updated successfully",
  STATUS_CHANGED: "Status updated successfully",
  API_ERROR: "Something went wrong",
};

export const showSuccessToast = (message) => toast.success(message);

export const showErrorToast = (message = TOAST_MESSAGES.API_ERROR) =>
  toast.error(message);
