import { TaskCard } from "./TaskCard";

/**
 * TaskGrid Component
 * 
 * Displays a grid of task cards with loading state.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tasks - Array of task objects to display
 * @param {boolean} props.loading - Whether tasks are currently loading
 * @param {Function} props.onTaskClick - Handler function when a task card is clicked
 * @returns {JSX.Element} Task grid component
 */
export const TaskGrid = ({ tasks, loading, onTaskClick }) => {
  if (loading && tasks.length === 0) {
    return (
      <div className="col-span-full h-64 flex flex-col items-center justify-center space-y-4">
        <span className="loading loading-ring loading-lg text-neon-cyan"></span>
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          Syncing_Neural_Network...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
      ))}
    </div>
  );
};
