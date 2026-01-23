import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  AdjustmentsHorizontalIcon 
} from "@heroicons/react/24/outline";
import { ThemeSettingsModal } from "./ThemeSettingsModal";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ColorThemePicker = () => {
  const { primaryColor, setPrimaryColor } = useThemeStore();
  const colors = [
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#f43f5e' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Orange', value: '#ea580c' },
  ];

  return (
    <div className="flex gap-1 mr-2 bg-base-100/50 p-1.5 rounded-xl border border-base-content/5">
      {colors.map((c) => (
        <button
          key={c.name}
          onClick={() => setPrimaryColor(c.value)}
          className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${primaryColor === c.value ? 'scale-125 ring-2 ring-base-content/50' : 'hover:scale-110'}`}
          style={{ backgroundColor: c.value }}
          title={c.name}
        />
      ))}
    </div>
  );
};

const ThemeToggleWithIcon = () => {
  const { mode, setMode } = useThemeStore();
  
  return (
    <button
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-base-content/10 bg-base-100/50 hover:bg-base-200/50 text-base-content/70 hover:text-primary transition-all shadow-sm cursor-pointer"
      title="Toggle Theme"
    >
      {mode === 'light' ? (
        <>
            <MoonIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Dark Mode</span>
        </>
      ) : (
        <>
            <SunIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Light Mode</span>
        </>
      )}
    </button>
  );
};

export const DashboardHeader = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();

  // Simple Breadcrumb logic
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentPage = pathSegments[pathSegments.length - 1] || 'Overview';

  return (
    <>
      <header className="hidden md:flex items-center justify-between px-8 py-5 mb-8 glass-panel rounded-2xl border border-base-content/5 relative z-30">
        
        {/* Left: Breadcrumbs / Title */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/60 capitalize">
            {currentPage.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mt-1">
             <span className="text-primary">NeonSprintMate</span>
             <span>/</span>
             <span className="uppercase">{user?.role || 'User'}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
             {/* Quick Color Picker */}
             <ColorThemePicker />

             {/* Theme Toggle */}
             <ThemeToggleWithIcon />

            {/* Theme Settings Trigger */}
            <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.2)] transition-all font-medium text-sm cursor-pointer"
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
