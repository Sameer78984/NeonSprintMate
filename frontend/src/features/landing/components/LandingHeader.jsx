import { useState } from "react";
import { Link } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Button";
import { ThemeSettingsModal } from "../../dashboard/components/ThemeSettingsModal";

export const LandingHeader = ({ isAuthenticated }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-deep-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple hover:opacity-80 transition-opacity">
            NEONSPRINTMATE
          </Link>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Customizer */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/5 hover:border-neon-cyan/30 transition-all text-zinc-400 hover:text-neon-cyan"
              title="Customize Theme"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
            
            {isAuthenticated ? (
               <Link to="/dashboard">
                  <Button variant="cyan" size="sm">
                    ENTER DASHBOARD
                  </Button>
               </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:block text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <Button variant="purple" size="sm" className="hidden md:flex">
                    GET ACCESS
                  </Button>
                   {/* Mobile only icon/text handled by button or specific mobile menu if needed, but keeping simple for now */}
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <ThemeSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};
