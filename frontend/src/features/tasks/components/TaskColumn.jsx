import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { SortableTaskCard } from "./SortableTaskCard";

/**
 * TaskColumn Component
 *
 * Represents a single column in the Kanban board.
 * Acts as a droppable area for tasks.
 *
 * @param {Object} props
 * @param {string} props.id - The status ID (e.g., 'todo', 'in-progress')
 * @param {string} props.title - The display title of the column
 * @param {Array} props.tasks - List of tasks in this column
 * @param {Function} props.onTaskClick - Handler for task clicks
 */
export const TaskColumn = ({ id, title, tasks, onTaskClick }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  // Map status to specific colors for the header
  const getStatusColor = (statusId) => {
    switch (statusId) {
      case "todo":
        return "border-neon-red/50 bg-neon-red/10 text-neon-red";
      case "in-progress":
        return "border-neon-yellow/50 bg-neon-yellow/10 text-neon-yellow"; // Changed from in-progress to snake_case check? 
        // Wait, the status is passed as 'todo', 'in_progress', 'done'.
        // The ID props in TaskKanban are 'todo', 'in_progress', 'done'.
        // So case "in_progress".
      case "in_progress": 
        return "border-neon-yellow/50 bg-neon-yellow/10 text-neon-yellow";
      case "done":
        return "border-neon-green/50 bg-neon-green/10 text-neon-green";
      default:
        return "border-base-content/20 bg-base-content/5";
    }
  };

  return (
    <div className="flex flex-col h-full min-w-[300px] w-full bg-base-100/50 rounded-2xl border border-base-content/5 p-4">
      {/* Column Header */}
      <div
        className={`flex items-center justify-between p-4 mb-4 rounded-xl border-l-4 ${getStatusColor(
          id
        )}`}
      >
        <h3 className="font-bold uppercase tracking-widest text-sm text-base-content">
          {title}
        </h3>
        <span className="text-xs font-mono text-base-content/60 bg-base-100/50 px-2 py-1 rounded">
          {tasks.length}
        </span>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className="flex-1 space-y-4 overflow-y-auto custom-scrollbar min-h-[150px]"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
