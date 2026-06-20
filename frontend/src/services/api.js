import axios from "axios";

// Create reusable axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000 // 10 second timeout
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);

    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timed out. The server took too long to respond.",
        type: "timeout",
        code: error.code,
      });
    }

    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || "Something went wrong",
        data: error.response.data,
        type: "server",
      });
    }

    if (error.request) {
      return Promise.reject({
        message:
          "Server unavailable. Please check if the backend is running.",
        type: "network",
      });
    }

    return Promise.reject({
      message: error.message || "Something went wrong",
      type: "client",
    });
  }
);

export default api;
