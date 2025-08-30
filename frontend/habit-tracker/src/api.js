import axios from "axios";

// Create instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

// Simple setter to inject/remove the token
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Optional: global 401 handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // e.g., redirect to /login or clear auth state
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
