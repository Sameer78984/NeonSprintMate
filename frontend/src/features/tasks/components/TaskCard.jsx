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
      whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.4)" }}
      onClick={onClick}
      className="glass-panel p-8 rounded-[2.5rem] bg-black/40 border border-white/5 group transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-10 h-1 w-20 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-500" 
           style={{ backgroundColor: task.status === 'done' ? 'var(--color-neon-green)' : task.status === 'in_progress' ? 'var(--color-neon-yellow)' : 'var(--color-neon-red)' }} />

      <div className="flex justify-between mb-6">
        <span
          className={`text-[9px] font-mono px-3 py-1 rounded-full border uppercase transition-colors duration-300 ${
             task.status === "done" ? "border-neon-green text-neon-green bg-neon-green/5 shadow-[0_0_10px_var(--color-neon-green)]" :
             task.status === "in_progress" ? "border-neon-yellow text-neon-yellow bg-neon-yellow/5 shadow-[0_0_10px_var(--color-neon-yellow)]" :
             "border-neon-red text-neon-red bg-neon-red/5 shadow-[0_0_5px_var(--color-neon-red)]"
          }`}
        >
          {task.status.replace("_", " ")}
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
            <span className="text-[9px] font-mono font-bold">PRIORITY</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
