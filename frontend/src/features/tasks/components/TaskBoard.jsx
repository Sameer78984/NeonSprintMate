import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import Button from "../../../components/Button";
import {
  PlusIcon,
  ClockIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import MatrixFilters from "../../dashboard/components/MatrixFilters";
import TaskActionMenu from "../../dashboard/components/TaskActionMenu";
import NewTaskModal from "../../tasks/components/CreateTaskModal";
import CreateTeamModal from "../../teams/components/CreateTeamModal";
import EditTaskModal from "../../tasks/components/EditTaskModal";

const TaskBoard = () => {
  // 1. Destructure fetchTasks and clearTasks from the store
  const {
    tasks,
    loading: tasksLoading,
    fetchTasks,
    clearTasks,
  } = useTaskStore();
  const { currentTeam, fetchTeams, loading: teamsLoading } = useTeamStore();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Initial Team Sync
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // 2. CRITICAL FIX: Fetch tasks whenever the currentTeam changes or page refreshes
  useEffect(() => {
    if (currentTeam?.id) {
      fetchTasks(currentTeam.id);
    } else {
      // Clean up the board if no team is selected
      clearTasks();
    }
  }, [currentTeam?.id, fetchTasks, clearTasks]);

  // Client-side Filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  // Handler to open the full edit modal
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <header className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Task_Matrix
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <UserGroupIcon className="h-4 w-4 text-neon-cyan" />
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">
                Active_Unit:{" "}
                <span className="text-neon-cyan">
                  {currentTeam?.name || "UNLINKED"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setIsTeamModalOpen(true)}>
              Unit_Mod
            </Button>
            <Button
              variant="cyan"
              onClick={() => setIsTaskModalOpen(true)}
              disabled={!currentTeam}
            >
              New_Entry
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <MatrixFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </header>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(tasksLoading || teamsLoading) && tasks.length === 0 ? (
          // Loading Skeleton / State
          <div className="col-span-full h-64 flex flex-col items-center justify-center space-y-4">
            <span className="loading loading-ring loading-lg text-neon-cyan"></span>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              Syncing_Neural_Network...
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.4)" }}
              onClick={() => handleTaskClick(task)}
              className="glass-panel p-8 rounded-[2.5rem] bg-black/40 border border-white/5 group transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 right-10 h-1 w-20 bg-neon-cyan opacity-0 blur-sm group-hover:opacity-40 transition-opacity" />

              <div className="flex justify-between mb-6">
                <span
                  className={`text-[9px] font-mono px-3 py-1 rounded-full border uppercase ${
                    task.status === "done"
                      ? "border-neon-cyan text-neon-cyan bg-neon-cyan/5"
                      : "border-zinc-700 text-zinc-500"
                  }`}
                >
                  {task.status}
                </span>

                {/* Stop Propagation to prevent opening Edit Modal when clicking menu */}
                <div onClick={(e) => e.stopPropagation()}>
                  <TaskActionMenu task={task} />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-neon-cyan transition-colors truncate">
                {task.title}
              </h3>

              <p className="text-zinc-500 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                {task.description || "No description provided."}
              </p>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-zinc-600">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase">
                  <ClockIcon className="h-4 w-4" /> Status: {task.status}
                </div>
                {task.priority === "high" && (
                  <div className="flex items-center gap-2 text-neon-purple opacity-80">
                    <FireIcon className="h-4 w-4 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold">
                      PRIORITY
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
      />

      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />
    </div>
  );
};

export default TaskBoard;
