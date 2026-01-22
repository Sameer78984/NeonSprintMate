import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance as axios } from "../lib/axios";
import { useTaskStore } from "./useTaskStore";
import { useTeamStore } from "./useTeamStore"; // <--- [NEW] Import Team Store

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

      // --- FINAL LOGOUT ACTION (CLEAN SWEEP) ---
      logout: async () => {
        try {
          // 1. Tell Backend to destroy session (removes cookie)
          await axios.post("/auth/logout");
        } catch (error) {
          console.warn("Logout backend error:", error.message);
        } finally {
          // 2. Wipe Zustand State immediately
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            errorField: null,
          });

          // 3. Trigger Cleaners in other stores
          useTaskStore.getState().clearTasks();
          useTeamStore.getState().clearTeam(); // <--- [NEW] Wipe Team Data

          // 4. CRITICAL: Manually remove ALL persisted storage keys
          localStorage.removeItem("auth-storage");
          localStorage.removeItem("task-storage");
          localStorage.removeItem("team-storage"); // <--- [NEW] Wipe Team Persistence

          // 5. Force a Hard Browser Refresh/Redirect
          window.location.href = "/login";
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
