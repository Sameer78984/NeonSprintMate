import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  AdjustmentsHorizontalIcon 
} from "@heroicons/react/24/outline";
import { ThemeSettingsModal } from "./ThemeSettingsModal";
import { useAuthStore } from "../../../stores/useAuthStore";

export const DashboardHeader = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();

  // Simple Breadcrumb logic
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || 'Overview';

  return (
    <>
      <header className="hidden md:flex items-center justify-between px-8 py-5 mb-8 glass-panel rounded-2xl border border-white/5 relative z-30">
        
        {/* Left: Breadcrumbs / Title */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 capitalize">
            {currentPage.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mt-1">
             <span className="text-neon-cyan">NeonSprintMate</span>
             <span>/</span>
             <span className="uppercase">{user?.role || 'User'}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
            {/* Theme Settings Trigger */}
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all font-medium text-sm"
            >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span>Customize</span>
            </button>
        </div>
      </header>

      <ThemeSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};
