import axios from "axios";

// Determine the base URL based on the environment
// PROD: Use "/api" to let Vercel proxy handle the request (Fixes Cookies)
// DEV:  Use localhost directly
const baseURL = import.meta.env.PROD
  ? "/api"
  : import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // ⚠️ CRITICAL: Must remain true for cookies to work
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle global error responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized");
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };
