import { useMemo } from "react";

/**
 * useTaskFilters Hook
 * 
 * Custom hook for filtering tasks by search query, status, and assignee.
 * 
 * @param {Array} tasks - Array of task objects to filter
 * @param {string} searchQuery - Search query string
 * @param {string} statusFilter - Status filter value ('all', 'todo', 'in_progress', 'done')
 * @param {string|number|null} assigneeFilter - Assignee filter value (user ID or 'all' or null)
 * @returns {Array} Filtered tasks array
 */
export const useTaskFilters = (tasks, searchQuery, statusFilter, assigneeFilter = null) => {
  return useMemo(() => {
    // Ensure tasks is an array
    if (!Array.isArray(tasks)) {
      return [];
    }

    // Normalize search query (handle null/undefined)
    const normalizedSearch = (searchQuery || "").toLowerCase().trim();

    return tasks.filter((task) => {
      // Skip invalid tasks
      if (!task || !task.title) {
        return false;
      }

      // Search filter: match title (case-insensitive)
      const matchesSearch = normalizedSearch === "" || 
        task.title.toLowerCase().includes(normalizedSearch);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      // Assignee filter with type-safe comparison
      let matchesAssignee = true;
      if (assigneeFilter && assigneeFilter !== "all" && assigneeFilter !== null) {
        if (assigneeFilter === "unassigned") {
          // Check for unassigned tasks (null, undefined, or empty)
          matchesAssignee = !task.assigned_to || task.assigned_to === null;
        } else {
          // Type-safe comparison: convert both to numbers for comparison
          // Handles cases where DB returns string IDs but filter has number, or vice versa
          const taskAssigneeId = task.assigned_to ? Number(task.assigned_to) : null;
          const filterAssigneeId = Number(assigneeFilter);
          matchesAssignee = taskAssigneeId === filterAssigneeId;
        }
      }

      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [tasks, searchQuery, statusFilter, assigneeFilter]);
};
