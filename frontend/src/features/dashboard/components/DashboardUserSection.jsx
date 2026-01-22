import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Button";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

/**
 * DashboardUserSection Component
 * 
 * Displays user information and logout button in the dashboard sidebar.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user object
 * @param {Function} props.logout - Logout handler function
 * @returns {JSX.Element} User section component
 */
export const DashboardUserSection = ({ user, logout }) => {
  return (
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
  );
};
