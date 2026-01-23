import { useState } from "react";
import { Link } from "react-router-dom";
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
export const DashboardUserSection = ({ user, logout, isCollapsed }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
  };

  return (
    <div className={`p-6 border-t border-base-content/5 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
      <Link 
        to="/dashboard/profile" 
        className={`flex items-center gap-4 mb-6 px-2 hover:bg-base-content/5 rounded-xl transition-colors p-2 -mx-2 group ${
          isCollapsed ? "justify-center" : ""
        }`}
        title={isCollapsed ? "Profile" : ""}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px] flex-shrink-0 group-hover:scale-110 transition-transform">
          <div className="h-full w-full rounded-full bg-base-300 flex items-center justify-center">
            <UserCircleIcon className="h-6 w-6 text-base-content/50 group-hover:text-neon-cyan transition-colors" />
          </div>
        </div>
        {!isCollapsed && (
          <div className="truncate">
            <p className="text-[10px] font-black uppercase truncate text-base-content group-hover:text-neon-cyan transition-colors">{user?.name || "User"}</p>
            <p className="text-[8px] text-base-content/50 tracking-wider font-mono truncate lowercase">{user?.email}</p>
          </div>
        )}
      </Link>
      
      <Button
        variant="purple"
        onClick={handleLogout}
        loading={loading}
        className={`w-full py-2 flex items-center justify-center gap-2 ${isCollapsed ? "px-0" : ""}`}
        title="Logout"
      >
        <ArrowLeftOnRectangleIcon className="h-4 w-4" /> 
        {!isCollapsed && "Logout"}
      </Button>
    </div>
  );
};
