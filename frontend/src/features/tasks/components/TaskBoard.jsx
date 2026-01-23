import { useEffect, useState, useMemo } from "react";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { MatrixFilters } from "../../dashboard/components/MatrixFilters";
import { CreateTaskModal } from "./CreateTaskModal";
import { CreateTeamModal } from "../../teams/components/CreateTeamModal";
import { EditTaskModal } from "./EditTaskModal";
import { TaskBoardHeader } from "./TaskBoardHeader";
import { TaskGrid } from "./TaskGrid";
import { TaskKanban } from "./TaskKanban";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { PomodoroWidget } from "../../dashboard/components/PomodoroWidget";
import { NotesWidget } from "../../dashboard/components/NotesWidget";
import { StatsWidget } from "../../dashboard/components/StatsWidget";
import { arrayMove } from "@dnd-kit/sortable";

/**
 * TaskBoard Component
 */
export const TaskBoard = () => {
  const {
    tasks,
    loading: tasksLoading,
    fetchTasks,
    clearTasks,
    updateTaskStatus,
  } = useTaskStore();
  const { currentTeam, fetchTeams, loading: teamsLoading } = useTeamStore();
  const { showPomodoro, showStats, showNotes } = useThemeStore();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); 

  // Local Order Persistence
  const [taskOrder, setTaskOrder] = useState(() => {
     try {
       const saved = localStorage.getItem("sprintmate_task_order");
       return saved ? JSON.parse(saved) : [];
     } catch { return []; }
  });

  useEffect(() => {
      if (taskOrder.length > 0) {
          localStorage.setItem("sprintmate_task_order", JSON.stringify(taskOrder));
      }
  }, [taskOrder]);

  // Initial Team Sync
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Fetch tasks
  useEffect(() => {
    if (currentTeam?.id) {
      fetchTasks(currentTeam.id);
    } else {
      clearTasks();
    }
  }, [currentTeam?.id, fetchTasks, clearTasks]);

  // Sort tasks based on local order
  const sortedTasks = useMemo(() => {
     if (!taskOrder.length) return tasks;
     const orderMap = new Map(taskOrder.map((id, index) => [id, index]));
     return [...tasks].sort((a, b) => {
         const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : 999999;
         const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : 999999;
         return indexA - indexB;
     });
  }, [tasks, taskOrder]);

  // Use custom hook for filtering on sorted tasks
  const filteredTasks = useTaskFilters(sortedTasks, searchQuery, statusFilter, assigneeFilter);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // 1. Handle Status Change
    const isOverTask = tasks.some((t) => t.id === over.id);
    let newStatus = over.id; 
    
    if (isOverTask) {
       // If dropped on a task, adopt its status
       const overTask = tasks.find((t) => t.id === over.id);
       if (overTask) newStatus = overTask.status;
    }

    const task = tasks.find((t) => t.id === active.id);
    if (task && task.status !== newStatus && !['todo','in_progress','done'].includes(active.id)) {
       updateTaskStatus(active.id, newStatus);
    }

    // 2. Handle Reordering (Visual)
    if (active.id !== over.id) {
        const oldIndex = sortedTasks.findIndex((t) => t.id === active.id);
        const newIndex = sortedTasks.findIndex((t) => t.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = arrayMove(sortedTasks.map(t => t.id), oldIndex, newIndex);
            setTaskOrder(newOrder);
        }
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 md:space-y-0 md:gap-6">
      
      {/* Header Section - Shrinks/Grows but stays at top */}
      <div className="flex-shrink-0 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <TaskBoardHeader
              currentTeam={currentTeam}
              onCreateTeam={() => setIsTeamModalOpen(true)}
              onCreateTask={() => setIsTaskModalOpen(true)}
            />
            
            {/* View Switcher */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-neon-cyan/10 text-neon-cyan"
                    : "text-zinc-500 hover:text-white"
                }`}
                title="List View"
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("board")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "board"
                    ? "bg-neon-purple/10 text-neon-purple"
                    : "text-zinc-500 hover:text-white"
                }`}
                title="Board View"
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Productivity Widgets Area */}
          {(showPomodoro || showStats || showNotes) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {showPomodoro && <PomodoroWidget />}
                  {showStats && <StatsWidget />}
                  {showNotes && <NotesWidget />}
              </div>
          )}

          <MatrixFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            assigneeFilter={assigneeFilter}
            setAssigneeFilter={setAssigneeFilter}
          />
      </div>

      {/* Content Section - Scrolls independently on desktop */}
      <div className="flex-1 min-h-0 relative">
        {viewMode === "list" ? (
          <div className="h-full overflow-y-auto custom-scrollbar">
              <TaskGrid
                tasks={filteredTasks}
                loading={tasksLoading || teamsLoading}
                onTaskClick={handleTaskClick}
              />
          </div>
        ) : (
          <TaskKanban
            tasks={filteredTasks}
            loading={tasksLoading || teamsLoading}
            onTaskClick={handleTaskClick}
            onDragEnd={handleDragEnd}
          />
        )}
      </div>

      {/* Modals */}
      <CreateTaskModal
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
