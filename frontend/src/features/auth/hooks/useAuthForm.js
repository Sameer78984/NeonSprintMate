import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useToastStore } from "../../../stores/useToastStore";

/**
 * useAuthForm Hook
 * 
 * Custom hook for handling authentication form logic including
 * form state, error handling, and submission.
 * 
 * @param {Object} initialFormData - Initial form data object
 * @param {'login'|'register'} type - Authentication type
 * @returns {Object} Form handlers and state
 */
export const useAuthForm = (initialFormData, type = "login") => {
  const [formData, setFormData] = useState(initialFormData);
  const { login, register, loading, errorField, clearAuthErrors } =
    useAuthStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  /**
   * Handles input field changes and clears errors when user starts typing
   * @param {string} field - Field name to update
   * @param {string} value - New field value
   */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errorField === field) clearAuthErrors();
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authFunction = type === "login" ? login : register;
    const res = await authFunction(formData);

    if (res.success) {
      if (type === "login") {
        addToast("Access Granted.", "cyan");
      } else {
        addToast(`Identity Verified. Welcome @${formData.username}`, "purple");
      }
      navigate("/dashboard");
    } else {
      addToast(res.error, "error");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    errorField,
  };
};
