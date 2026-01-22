import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

/**
 * Navigation items configuration for the mobile menu
 */
const navItems = [
  { name: "Task Matrix", path: "/dashboard" },
  { name: "Team Nexus", path: "/dashboard/teams" },
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
export const DashboardMobileMenu = ({ isOpen, onClose, logout }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-0 z-[100] bg-deep-black flex flex-col"
        >
          <div className="p-6 flex justify-between items-center border-b border-white/5">
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              System_Menu
            </span>
            <button onClick={onClose} className="p-2 text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 p-6 space-y-8 mt-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className="text-4xl font-black uppercase tracking-tighter block hover:text-neon-cyan transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="p-8 border-t border-white/5">
            <button
              onClick={logout}
              className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Close_Link
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
