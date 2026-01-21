import { create } from "zustand";
import axios from "../lib/axios";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (teamId) => {
    if (!teamId) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/tasks?team_id=${teamId}`);
      set({ tasks: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to load tasks", loading: false });
      console.error("Fetch tasks error:", error);
    }
  },

  // Optimized for KanBan boards and Drag-and-Drop
  updateTaskStatus: async (taskId, newStatus) => {
    // 1. Save previous state for rollback
    const previousTasks = get().tasks;

    // 2. Perform Optimistic Update (Instant UI change)
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    }));

    try {
      // 3. Persist change to Neon PostgreSQL
      await axios.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      // 4. Rollback on failure
      set({ tasks: previousTasks });
      console.error("Server update failed, rolling back UI:", error);
    }
  },

  // Cleanup action used during logout
  clearTasks: () => set({ tasks: [], error: null }),
}));
