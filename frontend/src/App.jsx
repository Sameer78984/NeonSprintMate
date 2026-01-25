import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "./stores/useAuthStore";
import { useToastStore } from "./stores/useToastStore";
import { useThemeStore } from "./stores/useThemeStore";
import { NeonGlobalLoader } from "./components/NeonGlobalLoader";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { GlobalBackground } from "./components/GlobalBackground";
import { Toast } from "./components/Toast";

// Lazy Loaded Components
const LandingPage = lazy(() => import("./features/landing/pages/LandingPage").then(module => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage").then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage").then(module => ({ default: module.RegisterPage })));
const DashboardLayout = lazy(() => import("./features/dashboard/components/DashboardLayout").then(module => ({ default: module.DashboardLayout })));
const TaskBoard = lazy(() => import("./features/tasks/components/TaskBoard").then(module => ({ default: module.TaskBoard })));
const TeamSettings = lazy(() => import("./features/teams/components/TeamSettings").then(module => ({ default: module.TeamSettings })));
const ProfilePage = lazy(() => import("./features/profile/pages/ProfilePage").then(module => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import("./features/settings/pages/SettingsPage").then(module => ({ default: module.SettingsPage })));
const WelcomePage = lazy(() => import("./features/welcome/pages/WelcomePage").then(module => ({ default: module.WelcomePage })));

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
    
    // CRITICAL: Toggle 'dark' class for Tailwind 'dark:' modifiers to work correctly
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

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
    
    // Global Neon Mode
    if (useThemeStore.getState().enableGlobalNeon) {
        root.classList.add('global-neon');
        const neonColor = useThemeStore.getState().globalNeonColor || primaryColor;
        root.style.setProperty("--global-neon-color", neonColor);
    } else {
        root.classList.remove('global-neon');
    }

    root.setAttribute("data-site-style", useThemeStore.getState().siteStyle);

    // Performance Mode Classes
    const perfMode = useThemeStore.getState().performanceMode;
    root.classList.remove('perf-low', 'perf-balanced', 'perf-high');
    root.classList.add(`perf-${perfMode}`);

  }, [mode, density, primaryColor, cardStyle, shadowIntensity, fontFamily, customTextColor, textShadow, textShadowColor, useThemeStore.getState().enableGlobalNeon, useThemeStore.getState().globalNeonColor, useThemeStore.getState().siteStyle, useThemeStore.getState().performanceMode]);


  if (useAuthStore((state) => state.isCheckingAuth)) {
    return <NeonGlobalLoader />;
  }

  return (
    <>
      <GlobalBackground />
      <Suspense fallback={<NeonGlobalLoader />}>
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
      </Suspense>

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

