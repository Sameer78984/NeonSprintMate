import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardUserSection } from "./DashboardUserSection";
import { DashboardMobileHeader } from "./DashboardMobileHeader";
import { DashboardMobileMenu } from "./DashboardMobileMenu";

/**
 * DashboardLayout Component
 * 
 * Main layout wrapper for authenticated dashboard pages.
 * Provides sidebar navigation, mobile menu, and content area.
 * 
 * @returns {JSX.Element} Dashboard layout component
 */
export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <div className="h-screen bg-deep-black text-white flex overflow-hidden font-sans">
      <aside className="hidden md:flex w-72 flex-col glass-panel border-r border-white/5 relative z-20">
        <DashboardSidebar />
        <DashboardUserSection user={user} logout={logout} />
      </aside>

      <DashboardMobileHeader onMenuOpen={() => setIsMobileMenuOpen(true)} />
      <DashboardMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logout={logout}
      />

      {/* Main Viewport (Dynamically swaps content) */}
      <main className="flex-1 relative overflow-y-auto pt-20 md:pt-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
