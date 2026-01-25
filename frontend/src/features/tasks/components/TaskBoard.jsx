import { useThemeStore } from "../../../stores/useThemeStore";
import { MatrixFilters } from "../../dashboard/components/MatrixFilters";
import { CreateTaskModal } from "./CreateTaskModal";
import { CreateTeamModal } from "../../teams/components/CreateTeamModal";
import { EditTaskModal } from "./EditTaskModal";
import { TaskBoardHeader } from "./TaskBoardHeader";
import { TaskGrid } from "./TaskGrid";
import { TaskKanban } from "./TaskKanban";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Button";
import { PomodoroWidget } from "../../dashboard/components/PomodoroWidget";
import { NotesWidget } from "../../dashboard/components/NotesWidget";
import { StatsWidget } from "../../dashboard/components/StatsWidget";
import { useTaskBoardLogic } from "../hooks/useTaskBoardLogic";

/**
 * TaskBoard Component
 * Refactored to use logic hook for better maintainability.
 */
export const TaskBoard = () => {
  const { showPomodoro, showStats, showNotes } = useThemeStore();
  
  const {
      currentTeam,
      tasksLoading,
      teamsLoading,
      filteredTasks,
      
      isTaskModalOpen, setIsTaskModalOpen,
      isTeamModalOpen, setIsTeamModalOpen,
      isEditModalOpen, setIsEditModalOpen,
      selectedTask, setSelectedTask,
      searchQuery, setSearchQuery,
      statusFilter, setStatusFilter,
      assigneeFilter, setAssigneeFilter,
      viewMode, setViewMode,

      handleDragEnd
  } = useTaskBoardLogic();

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full space-y-6 md:space-y-0 md:gap-6">
      
      {/* Header Section - Shrinks/Grows but stays at top */}
      <div className="flex-shrink-0 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <TaskBoardHeader
              currentTeam={currentTeam}
            />
            
            {/* Actions & View Switcher */}
            <div className="flex items-center gap-4 self-start md:self-auto">
                <div className="flex gap-3">
                     <Button variant="outline" onClick={() => setIsTeamModalOpen(true)} className="px-6 py-2 text-xs">
                        New Team
                     </Button>
                     <Button
                        variant="cyan"
                        onClick={() => setIsTaskModalOpen(true)}
                        disabled={!currentTeam}
                        className="px-6 py-2 text-xs"
                     >
                        New Task
                     </Button>
                </div>

                {/* View Toggles */}
                <div className="flex bg-base-100/50 p-1 rounded-xl border border-base-content/10">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-zinc-500 hover:text-base-content"
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
                        : "text-zinc-500 hover:text-base-content"
                    }`}
                    title="Board View"
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                </div>
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

      {/* Content Section */}
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

      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
