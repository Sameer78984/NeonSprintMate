import { motion } from "framer-motion";
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline";
import { TaskActionMenu } from "../../dashboard/components/TaskActionMenu";

/**
 * TaskCard Component
 * 
 * Displays a single task card with status, title, description, and action menu.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object to display
 * @param {Function} props.onClick - Handler function when card is clicked
 * @returns {JSX.Element} Task card component
 */
export const TaskCard = ({ task, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, borderColor: "rgba(var(--color-primary), 0.5)" }}
      onClick={onClick}
      className="glass-panel p-8 rounded-[2.5rem] bg-base-100/50 border border-base-content/5 hover:border-primary/50 group transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-10 h-1 w-20 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" 
           style={{ backgroundColor: task.status === 'done' ? 'var(--color-neon-green)' : task.status === 'in_progress' ? 'var(--color-neon-yellow)' : 'var(--color-neon-red)' }} />

      <div className="flex justify-between mb-6">
        <span
          className={`text-[10px] sm:text-xs font-bold px-5 py-2 min-w-[90px] text-center rounded-xl border-2 uppercase tracking-wider transition-all duration-300 ${
             task.status === "done" ? "border-neon-green/30 text-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(var(--color-neon-green),0.2)]" :
             task.status === "in_progress" ? "border-neon-yellow/30 text-neon-yellow bg-neon-yellow/10 shadow-[0_0_15px_rgba(var(--color-neon-yellow),0.2)]" :
             "border-base-content/20 text-base-content/70 bg-base-content/5"
          }`}
        >
          {task.status === "todo" ? "Backlog" : task.status === "in_progress" ? "Active" : "Completed"}
        </span>

        {/* Stop Propagation to prevent opening Edit Modal when clicking menu */}
        <div onClick={(e) => e.stopPropagation()}>
          <TaskActionMenu task={task} />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors truncate">
        {task.title}
      </h3>

      <p className="text-base-content/60 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
        {task.description || "No description provided."}
      </p>

      <div className="pt-6 border-t border-base-content/5 flex justify-between items-center text-base-content/70">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase">
          <ClockIcon className="h-4 w-4" /> Status: {task.status}
        </div>
        {task.priority === "high" && (
          <div className="flex items-center gap-2 text-neon-purple opacity-80">
            <FireIcon className="h-4 w-4 animate-pulse" />
            <span className="text-[9px] font-mono font-bold">PRIORITY</span>
          </div>
        )}
        {task.due_date && (
            <div className={`flex items-center gap-2 font-mono text-[9px] uppercase ${
                new Date(task.due_date) < new Date() && task.status !== 'done' ? 'text-neon-red animate-pulse' : 'text-base-content/50'
            }`}>
               <ClockIcon className="h-4 w-4" /> 
               {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
        )}
      </div>
    </motion.div>
  );
};
