import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "../lib/axios";
import { useTaskStore } from "./useTaskStore";

export const useAuthStore = create(
  persist(
    (set) => ({
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
        // 1. Immediately clear local state so the UI redirects
        set({ user: null, isAuthenticated: false, error: null });

        try {
          // 2. Attempt to notify the backend to clear cookies/sessions
          await axios.post("/auth/logout");
        } catch (error) {
          // 3. We catch the 401 silently because the local session is already dead
          console.warn(
            "Server-side logout failed or session already expired:",
            error.message,
          );
        } finally {
          // 4. Clear other stores like tasks
          useTaskStore.getState().clearTasks();
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
