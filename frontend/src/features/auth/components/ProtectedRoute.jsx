import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";

/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require authentication. Redirects to login if user is not authenticated.
 * Shows loading state while checking authentication status.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} Protected route wrapper or redirect
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  
  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-neon-cyan font-mono">
        INITIALIZING...
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
