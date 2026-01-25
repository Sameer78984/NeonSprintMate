import { useState, useEffect } from "react";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useToastStore } from "../../../stores/useToastStore";

/**
 * useTaskForm Hook
 * 
 * Custom hook for handling task form logic including form state,
 * member fetching, and submission.
 * 
 * @param {Object} initialFormData - Initial form data object
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onSuccess - Callback on successful submission
 * @returns {Object} Form handlers and state
 */
export const useTaskForm = (initialFormData, isOpen, onSuccess) => {
  const [formData, setFormData] = useState(initialFormData);
  const { addTask, updateTask, loading } = useTaskStore();
  const { members, fetchMembers, currentTeam } = useTeamStore();
  const { addToast } = useToastStore();

  // Sync member list whenever the modal opens
  useEffect(() => {
    if (isOpen && currentTeam) {
      fetchMembers();
    }
  }, [isOpen, currentTeam, fetchMembers]);

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   * @param {number|null} taskId - Task ID for updates (null for create)
   */
  const handleSubmit = async (e, taskId = null) => {
    e.preventDefault();
    const action = taskId ? updateTask : addTask;
    const args = taskId ? [taskId, formData] : [formData];
    const res = await action(...args);

    if (res.success) {
      if (taskId) {
        addToast("Objective updated successfully.", "purple");
      } else {
        addToast("Objective deployed to the matrix.", "cyan");
        setFormData(initialFormData);
      }
      onSuccess?.();
    } else {
      addToast(res.error, "error");
    }
    
    return res; // [FIX] Return result so components can handle UI errors
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    loading,
    members,
  };
};
