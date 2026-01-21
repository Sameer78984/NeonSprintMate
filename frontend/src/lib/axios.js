import axios from "axios";

const axiosInstance = axios.create({
  // Use environment variable for flexibility between local and production
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Required for Passport.js sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle global error responses (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic to redirect to login or clear zustand store could go here
      console.warn("Session expired or unauthorized");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
