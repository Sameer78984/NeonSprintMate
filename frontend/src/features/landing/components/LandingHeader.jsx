import { useState } from "react";
import { Link } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Button";
import { ThemeSettingsModal } from "../../dashboard/components/ThemeSettingsModal";

export const LandingHeader = ({ isAuthenticated }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-black italic shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition-all">
                N
             </div>
             <span className="text-lg font-black tracking-widest text-white uppercase group-hover:text-neon-cyan transition-colors">
               NeonSprint
             </span>
          </Link>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Customizer */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              title="Customize Theme"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
            
            {isAuthenticated ? (
               <Link to="/dashboard">
                  <Button variant="cyan" className="!py-2 !px-6 !text-[10px]">
                    DASHBOARD
                  </Button>
               </Link>
            ) : (
              <>
                <Link to="/login" className="text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors mr-2">
                  Login
                </Link>
                <Link to="/register">
                  <Button variant="purple" className="!py-2 !px-4 !text-[10px] hidden sm:inline-flex">
                    GET ACCESS
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <ThemeSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        showPreview={false}
      />
    </>
  );
};
