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
      errorField: null,

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

      clearAuthErrors: () => set({ error: null, errorField: null }),

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/auth/login", credentials);
          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
            errorField: null,
          });
          return { success: true };
        } catch (error) {
          // --- ROBUST ERROR EXTRACTION ---
          // 1. Check for 'error' key (Custom Handler)
          // 2. Check for 'message' key (Standard Frameworks)
          // 3. Check if 'data' is just a string
          // 4. Fallback to "Login failed"
          const data = error.response?.data;
          const errorMessage =
            data?.error ||
            data?.message ||
            (typeof data === "string" ? data : "Login failed");

          const errorField = data?.field || null;

          set({ error: errorMessage, errorField, loading: false });
          return { success: false, error: errorMessage, field: errorField };
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/auth/register", userData);
          set({
            user: res.data.user,
            isAuthenticated: true,
            loading: false,
            errorField: null,
          });
          return { success: true };
        } catch (error) {
          const data = error.response?.data;
          const errorMessage =
            data?.error ||
            data?.message ||
            (typeof data === "string" ? data : "Registration failed");
          const errorField = data?.field || null;

          set({ error: errorMessage, errorField, loading: false });
          return { success: false, error: errorMessage, field: errorField };
        }
      },

      logout: async () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          errorField: null,
        });
        try {
          await axios.post("/auth/logout");
        } catch (error) {
          console.warn("Logout error:", error.message);
        } finally {
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
