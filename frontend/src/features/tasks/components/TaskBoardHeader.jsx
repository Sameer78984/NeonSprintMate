import { UserGroupIcon } from "@heroicons/react/24/outline";


/**
 * TaskBoardHeader Component
 * 
 * Header section for the task board displaying title, active team, and action buttons.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.currentTeam - Currently selected team object
 * @param {Function} props.onCreateTeam - Handler to open create team modal
 * @param {Function} props.onCreateTask - Handler to open create task modal
 * @returns {JSX.Element} Task board header component
 */
export const TaskBoardHeader = ({ currentTeam }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/60">
          Tasks
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <UserGroupIcon className="h-4 w-4 text-primary" />
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">
            Active Team:{" "}
            <span className="text-primary">
              {currentTeam?.name || "No Team Selected"}
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};
