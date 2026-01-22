import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "./stores/useAuthStore";
import { useToastStore } from "./stores/useToastStore";

// Components
import { LandingPage } from "./features/landing/pages/LandingPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { DashboardLayout } from "./features/dashboard/components/DashboardLayout";
import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TeamSettings } from "./features/teams/components/TeamSettings";
import { Toast } from "./components/Toast";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";

/**
 * Main App Component
 * 
 * Sets up routing, authentication check, and global toast notifications.
 * All routes are defined here with protected routes wrapped in ProtectedRoute.
 */
export function App() {
  const { checkAuth } = useAuthStore();
  const toasts = useToastStore((state) => state.toasts); // Corrected selector

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TaskBoard />} />
          <Route path="teams" element={<TeamSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Portal: Top-Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <Toast message={toast.message} type={toast.type} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

