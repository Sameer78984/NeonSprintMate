import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "../../../stores/useTaskStore"; // Note: Adjusted path
import { useTeamStore } from "../../../stores/useTeamStore"; // New Import
import Button from "../../../components/Button"; // Note: Adjusted path
import {
  PlusIcon,
  EllipsisHorizontalIcon,
  ClockIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import NewTaskModal from "../../tasks/components/CreateTaskModal";
import CreateTeamModal from "../../teams/components/CreateTeamModal";

const TaskBoard = () => {
  const { tasks, loading: tasksLoading } = useTaskStore();
  const { currentTeam, fetchTeams, loading: teamsLoading } = useTeamStore();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Sync teams on mount
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="space-y-10">
      {/* --- Matrix Header --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            Task_Matrix
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <UserGroupIcon className="h-4 w-4 text-neon-cyan" />
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">
              Active_Unit:{" "}
              <span className="text-neon-cyan">
                {currentTeam ? currentTeam.name : "NO_UNIT_LINKED"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Create Team Button */}
          <Button
            variant="outline"
            onClick={() => setIsTeamModalOpen(true)}
            className="flex-1 sm:flex-none"
          >
            <UserGroupIcon className="h-4 w-4 mr-2" />{" "}
            {currentTeam ? "New Unit" : "Create Unit"}
          </Button>

          {/* Create Task Button (Disabled if no team) */}
          <Button
            variant="cyan"
            className="flex-1 sm:flex-none px-8"
            onClick={() => setIsTaskModalOpen(true)}
            disabled={!currentTeam} // Blocks the 400 error!
            title={!currentTeam ? "Create a team first" : "Add Task"}
          >
            <PlusIcon className="h-4 w-4 mr-2" /> New_Entry
          </Button>
        </div>
      </header>

      {/* --- Task Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(tasksLoading || teamsLoading) && tasks.length === 0 ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center space-y-4">
            <span className="loading loading-ring loading-lg text-neon-cyan"></span>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              Syncing_Neural_Network...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="col-span-full py-20 glass-panel rounded-[2.5rem] flex flex-col items-center border-dashed border-white/10 text-center p-6">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">
              {currentTeam ? "No Active Tasks in Matrix" : "Unit Link Required"}
            </p>
            {!currentTeam && (
              <Button variant="purple" onClick={() => setIsTeamModalOpen(true)}>
                Initialize First Team
              </Button>
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-[2.5rem] group hover:border-neon-cyan/40 transition-all duration-500 bg-black/40 relative overflow-hidden"
            >
              <div className="absolute top-0 right-10 h-1 w-20 bg-neon-cyan opacity-20 blur-sm group-hover:opacity-60 transition-opacity" />

              <div className="flex justify-between items-start mb-6">
                <span
                  className={`text-[9px] font-mono px-3 py-1 rounded-full border uppercase tracking-tighter ${
                    task.status === "done"
                      ? "border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan"
                      : "border-zinc-700 bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {task.status || "In_Queue"}
                </span>
                <button className="text-zinc-600 hover:text-white transition-colors">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-neon-cyan transition-colors truncate">
                {task.title}
              </h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                {task.description}
              </p>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-600">
                  <ClockIcon className="h-4 w-4" />
                  <span className="text-[9px] font-mono uppercase">Open</span>
                </div>
                {task.priority === "high" && (
                  <div className="flex items-center gap-2 text-neon-purple opacity-70">
                    <FireIcon className="h-4 w-4" />
                    <span className="text-[9px] font-mono uppercase font-bold">
                      High_Priority
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* --- Modals --- */}
      <NewTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />
    </div>
  );
};

export default TaskBoard;
