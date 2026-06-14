export const getNetworkErrorMessage = (error, fallback = "Something went wrong") => {
  if (!navigator.onLine) {
    return "You appear to be offline. Please check your internet connection.";
  }

  if (
    error?.code === "ECONNABORTED" ||
    error?.message?.toLowerCase().includes("timeout")
  ) {
    return "Request timed out. The server took too long to respond.";
  }

  if (
    error?.type === "network" ||
    error?.message?.toLowerCase().includes("no response from server")
  ) {
    return "Server unavailable. Please check if the backend is running.";
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.data?.message) {
    return error.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
};
