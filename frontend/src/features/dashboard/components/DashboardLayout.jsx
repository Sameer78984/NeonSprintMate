import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <div className="h-screen bg-transparent text-white flex overflow-hidden font-sans transition-colors duration-500">
      <aside 
        className={`hidden md:flex flex-col glass-panel border-r border-white/5 relative z-20 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        <DashboardSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <DashboardUserSection 
          user={user} 
          logout={logout} 
          isCollapsed={isSidebarCollapsed}
        />
      </aside>

      <DashboardMobileHeader onMenuOpen={() => setIsMobileMenuOpen(true)} />
      <DashboardMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logout={logout}
        user={user}
      />

      {/* Main Viewport (Dynamically swaps content) */}
      <main className="flex-1 relative overflow-y-auto pt-20 md:pt-0">
        <div className="p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col">
          <DashboardHeader />
          <div className="flex-1 relative">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
