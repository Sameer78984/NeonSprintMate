import { useEffect, useState } from "react";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { MatrixFilters } from "../../dashboard/components/MatrixFilters";
import { CreateTaskModal } from "./CreateTaskModal";
import { CreateTeamModal } from "../../teams/components/CreateTeamModal";
import { EditTaskModal } from "./EditTaskModal";
import { TaskBoardHeader } from "./TaskBoardHeader";
import { TaskGrid } from "./TaskGrid";
import { useTaskFilters } from "../hooks/useTaskFilters";

/**
 * TaskBoard Component
 * 
 * Main task board view displaying tasks in a grid layout with filtering capabilities.
 * Handles task fetching, filtering, and modal state management.
 * 
 * @returns {JSX.Element} Task board component
 */
export const TaskBoard = () => {
  const {
    tasks,
    loading: tasksLoading,
    fetchTasks,
    clearTasks,
  } = useTaskStore();
  const { currentTeam, fetchTeams, loading: teamsLoading } = useTeamStore();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Initial Team Sync
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Fetch tasks whenever the currentTeam changes or page refreshes
  useEffect(() => {
    if (currentTeam?.id) {
      fetchTasks(currentTeam.id);
    } else {
      // Clean up the board if no team is selected
      clearTasks();
    }
  }, [currentTeam?.id, fetchTasks, clearTasks]);

  // Use custom hook for filtering
  const filteredTasks = useTaskFilters(tasks, searchQuery, statusFilter);

  /**
   * Handler to open the full edit modal when a task card is clicked
   * @param {Object} task - Task object that was clicked
   */
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-8">
        <TaskBoardHeader
          currentTeam={currentTeam}
          onCreateTeam={() => setIsTeamModalOpen(true)}
          onCreateTask={() => setIsTaskModalOpen(true)}
        />

        <MatrixFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </header>

      <TaskGrid
        tasks={filteredTasks}
        loading={tasksLoading || teamsLoading}
        onTaskClick={handleTaskClick}
      />

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
