import { AnimatedText } from "../../../components/AnimatedText";
import { UserGroupIcon } from "@heroicons/react/24/outline";

/**
 * TaskBoardHeader Component
 * 
 * Header section for the task board displaying title, and active team.
 */
export const TaskBoardHeader = ({ currentTeam }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/60">
          <AnimatedText text="TASKS" />
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <UserGroupIcon className="h-4 w-4 text-primary" />
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-2">
            Active Team:{" "}
            <span className="text-primary">
              <AnimatedText text={currentTeam?.name || "No Team Selected"} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
