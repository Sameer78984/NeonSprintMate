import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "./stores/useAuthStore";
import { useToastStore } from "./stores/useToastStore";
import { useThemeStore } from "./stores/useThemeStore";

// Components
import { LandingPage } from "./features/landing/pages/LandingPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { DashboardLayout } from "./features/dashboard/components/DashboardLayout";
import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TeamSettings } from "./features/teams/components/TeamSettings";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { SettingsPage } from "./features/settings/pages/SettingsPage";
import { Toast } from "./components/Toast";
import { NeonGlobalLoader } from "./components/NeonGlobalLoader";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { GlobalBackground } from "./components/GlobalBackground";
import { WelcomePage } from "./features/welcome/pages/WelcomePage";

/**
 * Main App Component
 * 
 * Sets up routing, authentication check, and global toast notifications.
 * All routes are defined here with protected routes wrapped in ProtectedRoute.
 */
/**
 * Route wrapper that redirects authenticated users to dashboard
 */
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export function App() {
  const { checkAuth } = useAuthStore();
  const toasts = useToastStore((state) => state.toasts); // Corrected selector
  const { 
    mode, 
    density, 
    primaryColor, 
    cardStyle, 
    shadowIntensity, 
    fontFamily, 
    customTextColor,
    textShadow,
    textShadowColor,
    hasSeenWelcome 
  } = useThemeStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!hasSeenWelcome && location.pathname !== "/welcome") {
      navigate("/welcome");
    }
  }, [hasSeenWelcome, location.pathname, navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    root.setAttribute("data-card-style", cardStyle);
    
    // Dynamic Scaling
    root.style.fontSize = `${density * 100}%`;
    
    // Dynamic Colors
    root.style.setProperty("--color-neon-cyan", primaryColor);
    root.style.setProperty("--p", primaryColor); 
    
    // Advanced Customization
    const blur = shadowIntensity * 20; // 20px base
    const spread = shadowIntensity * 5; // 5px base
    root.style.setProperty("--neon-shadow-blur", `${blur}px`);
    root.style.setProperty("--neon-shadow-spread", `${spread}px`);
    
    // Text Shadow
    const shadowColor = textShadowColor || primaryColor;
    const textGlow = textShadow > 0 
      ? `0 0 ${textShadow * 3}px ${shadowColor}80` 
      : "none";
    root.style.setProperty("--text-shadow-glow", textGlow);
    
    if (customTextColor) {
        root.style.setProperty("--text-primary", customTextColor);
        root.style.setProperty("--bc", customTextColor);
        root.style.color = customTextColor;
    }
    
    root.style.setProperty("--font-family", fontFamily);
    
    root.style.setProperty("--font-family", fontFamily);

    // Dynamic Google Font Loading
    if (fontFamily && !["Inter, sans-serif", "'Roboto Mono', monospace", "serif", "'Orbitron', sans-serif"].includes(fontFamily)) {
        const fontName = fontFamily.split(",")[0].replace(/['"]/g, "");
        const linkId = "custom-google-font";
        let link = document.getElementById(linkId);
        
        if (!link) {
            link = document.createElement("link");
            link.id = linkId;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
        
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}:wght@300;400;500;700;900&display=swap`;
    }
    
  }, [mode, density, primaryColor, cardStyle, shadowIntensity, fontFamily, customTextColor, textShadow, textShadowColor]);


  if (useAuthStore((state) => state.isCheckingAuth)) {
    return <NeonGlobalLoader />;
  }

  return (
    <>
      <GlobalBackground />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          } 
        />
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
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
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

