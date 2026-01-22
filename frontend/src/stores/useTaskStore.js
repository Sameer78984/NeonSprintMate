import { create } from "zustand";
import axios from "../lib/axios";
import { useTeamStore } from "./useTeamStore";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

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
      const payload = { ...taskData, team_id: currentTeam.id };

      // Sanitization: Ensure assigned_to is a number or removed if empty
      if (!payload.assigned_to || payload.assigned_to === "") {
        delete payload.assigned_to;
      } else {
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

  // [NEW] Full Task Update Action
  updateTask: async (taskId, updatedData) => {
    const previousTasks = get().tasks;
    set({ loading: true, error: null });

    // Optimistic UI Update
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      ),
    }));

    try {
      const payload = { ...updatedData };

      // Sanitization for assigned_to
      if (payload.assigned_to === "" || payload.assigned_to === null) {
        payload.assigned_to = null;
      } else if (payload.assigned_to) {
        payload.assigned_to = Number(payload.assigned_to);
      }

      const res = await axios.put(`/tasks/${taskId}`, payload);
      set({ loading: false });
      return { success: true, data: res.data.data };
    } catch (error) {
      // Rollback on failure
      set({ tasks: previousTasks, loading: false });
      const errorMessage = error.response?.data?.error || "Update Failed";
      return { success: false, error: errorMessage };
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

  deleteTask: async (taskId) => {
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));

    try {
      await axios.delete(`/tasks/${taskId}`);
      return { success: true };
    } catch (error) {
      console.log("There was an error in deleteTask, ", error);
      set({ tasks: previousTasks });
      return { success: false, error: "Failed to delete task" };
    }
  },

  clearTasks: () => set({ tasks: [], error: null }),
}));
