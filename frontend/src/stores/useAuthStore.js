import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "../lib/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      // Removed 'get' here to fix the "defined but never used" error
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await axios.get("/auth/me");
          set({ user: res.data.user, isAuthenticated: true, loading: false });
        } catch (error) {
          console.log("There was an error in checkAuth, ", error);
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/auth/register", userData);
          set({ user: res.data.user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.error || "Registration failed";
          set({ error: message, loading: false });
          return { success: false, message };
        }
      },

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/auth/login", credentials);
          set({ user: res.data.user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.error || "Login failed";
          set({ error: message, loading: false, isAuthenticated: false });
          return { success: false, message };
        }
      },

      logout: async () => {
        try {
          await axios.post("/auth/logout");
          set({ user: null, isAuthenticated: false, error: null });
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);
