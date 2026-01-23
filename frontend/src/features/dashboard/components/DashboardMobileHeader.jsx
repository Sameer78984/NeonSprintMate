import { Bars3Icon } from "@heroicons/react/24/outline";

/**
 * DashboardMobileHeader Component
 * 
 * Mobile header with menu toggle button for the dashboard.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onMenuOpen - Function to open the mobile menu
 * @returns {JSX.Element} Mobile header component
 */
export const DashboardMobileHeader = ({ onMenuOpen }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5">
      <h1 className="text-sm font-black tracking-[0.2em] uppercase text-neon-cyan">
        NeonSprintMate
      </h1>
      <button onClick={onMenuOpen} className="p-2 text-zinc-400">
        <Bars3Icon className="h-6 w-6" />
      </button>
    </div>
  );
};
