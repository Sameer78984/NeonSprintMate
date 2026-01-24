import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance as axios } from "../lib/axios";
import { useTaskStore } from "./useTaskStore";

export const useTeamStore = create(
  persist(
    (set, get) => ({
      teams: [],
      currentTeam: null,
      members: [],
      loading: false,
      error: null,

      fetchTeams: async () => {
        set({ loading: true });
        try {
          const res = await axios.get("/teams");
          const teamsList = res.data.data;
          set({ teams: teamsList, loading: false });

          // Validate persisted team against fetched list
          const currentTeam = get().currentTeam;
          const isCurrentTeamValid = currentTeam && teamsList.find(t => t.id === currentTeam.id);

          if (!isCurrentTeamValid) {
            if (teamsList.length > 0) {
              // Switch to first available team
              const firstTeam = teamsList[0];
              set({ currentTeam: firstTeam });
              useTaskStore.getState().fetchTasks(firstTeam.id);
              get().fetchMembers();
            } else {
              // No teams available
              set({ currentTeam: null });
              useTaskStore.getState().clearTasks();
            }
          } else {
            // Determine if we need to refresh data for the valid current team
            // (Optional, but good practice to ensure freshness)
             useTaskStore.getState().fetchTasks(currentTeam.id);
             get().fetchMembers();
          }
        } catch (error) {
          set({ error: "Failed to sync neural units", loading: false });
        }
      },

      fetchMembers: async () => {
        const team = get().currentTeam;
        if (!team) return;

        set({ loading: true });
        try {
          const res = await axios.get(`/teams/${team.id}/members`);
          set({ members: res.data.data, loading: false });
        } catch (error) {
          console.error("Member Fetch Error:", error);
          set({ loading: false });
        }
      },

      addMember: async (email) => {
        const team = get().currentTeam;
        if (!team) return { success: false, error: "No active unit" };

        set({ loading: true });
        try {
          await axios.post(`/teams/${team.id}/members`, { email });
          await get().fetchMembers();
          set({ loading: false });
          return { success: true };
        } catch (error) {
          const msg = error.response?.data?.error || "Recruitment Failed";
          set({ loading: false });
          return { success: false, error: msg };
        }
      },

      createTeam: async (teamData) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/teams", teamData);
          const newTeam = res.data.data;

          set((state) => ({
            teams: [...state.teams, newTeam],
            currentTeam: newTeam,
            loading: false,
          }));

          useTaskStore.getState().clearTasks();
          get().fetchMembers();
          return { success: true };
        } catch (error) {
          const msg =
            error.response?.data?.error || "Unit Initialization Failed";
          set({ error: msg, loading: false });
          return { success: false, error: msg };
        }
      },

      selectTeam: (team) => {
        set({ currentTeam: team });
        useTaskStore.getState().fetchTasks(team.id);
        get().fetchMembers();
      },

      // [UPDATED] Clean Sweep Action
      // Called by useAuthStore.logout() to wipe browser memory
      clearTeam: () => {
        set({ teams: [], members: [], currentTeam: null, error: null });
        localStorage.removeItem("team-storage"); // <--- CRITICAL FIX
      },
    }),
    {
      name: "team-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
