import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "./stores/useAuthStore";
import { useToastStore } from "./stores/useToastStore";

// Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./features/dashboard/components/DashboardLayout";
import TaskBoard from "./pages/TaskBoard";
import TeamSettings from "./pages/TeamSettings";
import Toast from "./components/Toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center text-neon-cyan font-mono">
        INITIALIZING...
      </div>
    );
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
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

export default App;
