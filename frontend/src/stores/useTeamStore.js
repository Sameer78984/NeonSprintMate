import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "../lib/axios";
import { useTaskStore } from "./useTaskStore";

export const useTeamStore = create(
  persist(
    (set, get) => ({
      teams: [],
      currentTeam: null,
      members: [], // [NEW] Store for team members
      loading: false,
      error: null,

      fetchTeams: async () => {
        set({ loading: true });
        try {
          const res = await axios.get("/teams");
          const teamsList = res.data.data;
          set({ teams: teamsList, loading: false });

          if (teamsList.length > 0 && !get().currentTeam) {
            const firstTeam = teamsList[0];
            set({ currentTeam: firstTeam });
            useTaskStore.getState().fetchTasks(firstTeam.id);
            get().fetchMembers(); // [NEW] Fetch members for auto-selected team
          }
        } catch (error) {
          set({ error: "Failed to sync neural units", loading: false });
        }
      },

      // [NEW] Fetch Members
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

      // [NEW] Invite Member (By Email)
      addMember: async (email) => {
        const team = get().currentTeam;
        if (!team) return { success: false, error: "No active unit" };

        set({ loading: true });
        try {
          await axios.post(`/teams/${team.id}/members`, { email });
          await get().fetchMembers(); // Refresh list immediately
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
          get().fetchMembers(); // Fetch the single member (you) for the new team
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
        get().fetchMembers(); // Fetch members when switching teams
      },

      clearTeams: () =>
        set({ teams: [], members: [], currentTeam: null, error: null }),
    }),
    {
      name: "team-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
