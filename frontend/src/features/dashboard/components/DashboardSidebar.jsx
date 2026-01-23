import { Link, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  UserGroupIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

/**
 * Navigation items configuration for the dashboard sidebar
 */
const navItems = [
  { name: "Tasks", path: "/dashboard", icon: Squares2X2Icon },
  { name: "Teams", path: "/dashboard/teams", icon: UserGroupIcon },
  { name: "Settings", path: "/dashboard/settings", icon: Cog6ToothIcon },
  { name: "Profile", path: "/dashboard/profile", icon: UserCircleIcon },
];

/**
 * DashboardSidebar Component
 * 
 * Desktop sidebar navigation for the dashboard.
 * Supports expanded and collapsed states.
 */
export const DashboardSidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <>
      <div className={`p-6 flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && (
             <h1 className="text-lg font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple flex-1 min-w-0">
               NeonSprintMate
             </h1>
        )}
        <button 
          onClick={onToggle}
          className="p-2 rounded-xl bg-black/50 border border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_var(--color-neon-cyan)] hover:bg-neon-cyan/10 transition-all duration-300 flex-shrink-0"
        >
          {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
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
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon className={`h-6 w-6 flex-shrink-0 ${isActive ? "text-neon-cyan" : "group-hover:text-white"}`} />
              {!isCollapsed && (
                <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};
