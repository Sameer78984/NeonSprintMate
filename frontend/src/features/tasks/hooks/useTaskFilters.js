import { useMemo } from "react";

/**
 * useTaskFilters Hook
 * 
 * Custom hook for filtering tasks by search query and status.
 * 
 * @param {Array} tasks - Array of task objects to filter
 * @param {string} searchQuery - Search query string
 * @param {string} statusFilter - Status filter value ('all', 'todo', 'in_progress', 'done')
 * @returns {Array} Filtered tasks array
 */
export const useTaskFilters = (tasks, searchQuery, statusFilter) => {
  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);
};
