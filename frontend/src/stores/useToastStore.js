import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  /**
   * Add a neon toast to the queue.
   * @param {string} message - The system alert message.
   * @param {'cyan' | 'purple' | 'error'} type - The color protocol.
   */
  addToast: (message, type = "cyan", duration = 3000) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
}));
