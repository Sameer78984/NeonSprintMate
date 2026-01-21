import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../../stores/useAuthStore";
import Button from "../../../components/Button";
import { 
  Squares2X2Icon, 
  UserGroupIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { name: "Task Matrix", path: "/dashboard", icon: Squares2X2Icon },
    { name: "Team Nexus", path: "/dashboard/teams", icon: UserGroupIcon },
  ];

  return (
    <div className="h-screen bg-deep-black text-white flex overflow-hidden font-sans">
      
      {/* --- Desktop Glass Sidebar --- */}
      <aside className="hidden md:flex w-72 flex-col glass-panel border-r border-white/5 relative z-20">
        <div className="p-8">
          <h1 className="text-xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
            SprintMate
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                  ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-6 w-6 ${isActive ? "text-neon-cyan" : "group-hover:text-white"}`} />
                <span className="text-xs font-bold tracking-widest uppercase">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Identity Section */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6 px-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
              <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-zinc-400" />
              </div>
            </div>
            <div className="truncate">
              <p className="text-[10px] font-black uppercase truncate">{user?.name || "Operative"}</p>
              <p className="text-[8px] text-zinc-500 tracking-wider uppercase truncate">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="purple" 
            onClick={logout} 
            className="w-full py-2 flex items-center justify-center gap-2"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Terminate
          </Button>
        </div>
      </aside>

      {/* --- Mobile Interface Header --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5">
        <h1 className="text-sm font-black tracking-[0.2em] uppercase text-neon-cyan">SprintMate</h1>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-zinc-400">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* --- Mobile Slide-over Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[100] bg-deep-black flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">System_Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white"><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 p-6 space-y-8 mt-10">
              {navItems.map(item => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter block hover:text-neon-cyan transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="p-8 border-t border-white/5">
               <button onClick={logout} className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                 <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Close_Link
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Viewport (Dynamically swaps content) --- */}
      <main className="flex-1 relative overflow-y-auto pt-20 md:pt-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {/* Important: React Router renders TaskBoard or TeamSettings here */}
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;