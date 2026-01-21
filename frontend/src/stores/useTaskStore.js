import { create } from "zustand";
import axios from "../lib/axios";
import { useTeamStore } from "./useTeamStore"; // Import the Team Store

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // Fetch tasks for the specific team ID provided
  fetchTasks: async (teamId) => {
    if (!teamId) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/tasks?team_id=${teamId}`);
      set({ tasks: res.data.data, loading: false });
    } catch (error) {
      set({ error: "Failed to load tasks", loading: false });
      console.error("Fetch tasks error:", error);
    }
  },

  addTask: async (taskData) => {
    set({ loading: true, error: null });
    const { currentTeam } = useTeamStore.getState();

    if (!currentTeam?.id) {
      const msg = "No active team selected.";
      set({ error: msg, loading: false });
      return { success: false, error: msg };
    }

    try {
      // PREPARE PAYLOAD
      const payload = {
        ...taskData,
        team_id: currentTeam.id,
      };

      // FIX: If assigned_to is an empty string ("Unassigned"),
      // delete it so the backend doesn't complain about types.
      if (!payload.assigned_to || payload.assigned_to === "") {
        delete payload.assigned_to;
      } else {
        // Ensure it is sent as a number if it exists
        payload.assigned_to = Number(payload.assigned_to);
      }

      const res = await axios.post("/tasks", payload);

      set((state) => ({
        tasks: [res.data.data, ...state.tasks],
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Task Creation Failed";
      const finalMessage = Array.isArray(error.response?.data?.errors)
        ? error.response?.data?.errors[0].msg
        : errorMessage;

      set({ error: finalMessage, loading: false });
      return { success: false, error: finalMessage };
    }
  },

  updateTaskStatus: async (taskId, newStatus) => {
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    }));

    try {
      await axios.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      set({ tasks: previousTasks });
      console.error("Server update failed:", error);
    }
  },

  clearTasks: () => set({ tasks: [], error: null }),
}));
