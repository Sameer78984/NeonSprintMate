import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  XMarkIcon, 
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  UserGroupIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

/**
 * Navigation items configuration for the mobile menu
 */
const navItems = [
  { name: "Tasks", path: "/dashboard", icon: Squares2X2Icon, color: "text-neon-cyan" },
  { name: "Teams", path: "/dashboard/teams", icon: UserGroupIcon, color: "text-neon-purple" },
  { name: "Settings", path: "/dashboard/settings", icon: Cog6ToothIcon, color: "text-neon-pink" },
];

/**
 * DashboardMobileMenu Component
 * 
 * Mobile slide-over menu for dashboard navigation.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the menu is open
 * @param {Function} props.onClose - Function to close the menu
 * @param {Function} props.logout - Logout handler function
 * @returns {JSX.Element} Mobile menu component
 */
export const DashboardMobileMenu = ({ isOpen, onClose, logout, user }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm z-[100] bg-base-100/95 backdrop-blur-2xl border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-base-content/5">
              <span className="text-xs font-black font-mono text-base-content/40 tracking-[0.2em] uppercase">
                Navigation
              </span>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl bg-base-content/5 hover:bg-base-content/10 text-base-content transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-6 space-y-3 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border
                      ${isActive 
                        ? "bg-base-content/5 border-primary/20" 
                        : "bg-transparent border-transparent hover:bg-base-content/5 hover:border-base-content/5"
                      }
                    `}
                  >
                    <div className={`p-3 rounded-xl bg-base-100 shadow-sm ${isActive ? "text-primary" : "text-base-content/60 group-hover:text-primary"} transition-colors`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold tracking-tight ${isActive ? "text-primary" : "text-base-content"}`}>
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-mono text-base-content/40 uppercase tracking-wider">
                        View {item.name}
                      </p>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* User Profile & Footer */}
            <div className="p-6 border-t border-base-content/5 bg-base-content/2">
               <Link 
                  to="/dashboard/profile"
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 mb-4 rounded-2xl bg-base-100/50 border border-base-content/5 active:scale-95 transition-all shadow-sm"
               >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
                    <div className="h-full w-full rounded-full bg-base-100 flex items-center justify-center overflow-hidden">
                       {user?.avatar ? (
                         <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-sm font-bold text-base-content uppercase">
                           {user?.name?.charAt(0) || "U"}
                         </span>
                       )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-base-content uppercase truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-base-content/50 font-mono truncate">{user?.email}</p>
                  </div>
               </Link>
  
              <button
                onClick={logout}
                className="w-full py-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 font-bold tracking-wide uppercase text-xs flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Disconnect
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
