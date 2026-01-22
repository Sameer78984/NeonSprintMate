import { Link, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

/**
 * Navigation items configuration for the dashboard sidebar
 */
const navItems = [
  { name: "Task Matrix", path: "/dashboard", icon: Squares2X2Icon },
  { name: "Team Nexus", path: "/dashboard/teams", icon: UserGroupIcon },
];

/**
 * DashboardSidebar Component
 * 
 * Desktop sidebar navigation for the dashboard.
 * Displays navigation items and highlights the active route.
 * 
 * @returns {JSX.Element} Sidebar component
 */
export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <>
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
    </>
  );
};
