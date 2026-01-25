import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  StarIcon, 
  FireIcon,
  CheckCircleIcon,
  ClockIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import { TaskActionMenu } from "../../dashboard/components/TaskActionMenu";
import { useThemeStore } from "../../../stores/useThemeStore";

/**
 * TaskCard Component - Redesigned
 * 
 * A modern, practical, and highly visual task card.
 * Handles text overflow gracefully and presents metadata clearly.
 */
export const TaskCard = ({ task, onClick }) => {
  const { cardStyle, cardOpacity, cardBlur, mode } = useThemeStore();
  
  // Determine status color theme
  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'neon-green';
      case 'in_progress': return 'neon-yellow';
      default: return 'neon-red'; // todo
    }
  };

  const statusColor = getStatusColor(task.status);
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  /* Safe color lookup for inline styles since dynamic tailwind classes might be pruned */
  const getStatusVar = () => `var(--color-${statusColor})`;

  // Adaptive background for Light Mode
  const getBackgroundColor = () => {
      if (cardStyle === 'outline') return 'transparent';
      
      const isLight = mode === 'light';
      const baseOpacity = cardOpacity || 0.6;

      if (cardStyle === 'fiery') return isLight ? 'rgba(255, 237, 213, 0.9)' : 'rgba(20, 10, 5, 0.85)';
      if (cardStyle === 'calm') return isLight ? 'rgba(207, 250, 254, 0.9)' : 'rgba(5, 15, 20, 0.7)';
      
      // Standard / Neon / Glass
      return isLight 
        ? `rgba(255, 255, 255, ${Math.min(baseOpacity + 0.2, 0.95)})` 
        : `rgba(9, 9, 11, ${baseOpacity})`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        zIndex: 50,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      onClick={onClick}
      className={`
        group relative w-full
        rounded-[1.5rem] overflow-hidden cursor-pointer
        transition-colors duration-300
        ${cardStyle === 'outline' ? 'bg-transparent' : ''}
        border-2 border-[var(--status-color)] 
        hover:border-[var(--status-color)] 
        transition-all duration-300
        hover:shadow-[0_0_20px_var(--status-color)] hover:-translate-y-1 hover:scale-[1.01]
        ${cardStyle === 'neon' ? 'shadow-[0_0_5px_rgba(var(--color-primary),0.3)]' : ''}
      `}
      style={{
        '--status-color': getStatusVar(),
        backgroundColor: getBackgroundColor(),
        backdropFilter: `blur(${cardBlur}px)`,
        borderColor: `var(--color-${statusColor})` // Ensure border is always visible as requested
      }}
    >
      {/* Dynamic Glow Gradient behind card - Reduced in Light Mode */}
      <div className={`absolute -inset-1 bg-gradient-to-br from-[var(--status-color)] to-transparent ${mode === 'light' ? 'opacity-10 group-hover:opacity-20' : 'opacity-20 group-hover:opacity-40'} blur-xl transition-opacity duration-500`} />


      <div className="p-6 flex flex-col h-full relative z-10 w-full">
        
        {/* 2. Header: Badges & Action Menu */}
        <div className="flex justify-between items-start mb-4 w-full">
           <div className="flex gap-2 flex-wrap max-w-[80%]">
             {/* Status Badge */}
             <span 
                className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border shadow-sm"
                style={{ 
                    backgroundColor: `rgba(var(--color-${statusColor}-rgb), ${mode === 'light' ? 0.1 : 0.1})`, 
                    borderColor: `rgba(var(--color-${statusColor}-rgb), ${mode === 'light' ? 0.3 : 0.2})`,
                    color: mode === 'light' && statusColor === 'neon-yellow' ? '#d97706' : getStatusVar() // Darker yellow for text in light mode
                }}
             >
               {task.status.replace("_", " ")}
             </span>

             {/* Priority Badge (Only if High) */}
             {task.priority === "high" && (
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border bg-neon-purple/10 border-neon-purple/20 text-neon-purple flex items-center gap-1">
                   <FireIcon className="h-3 w-3" /> HIGH
                </span>
             )}
           </div>

           {/* Action Menu (Always Visible) */}
           <div onClick={(e) => e.stopPropagation()} className="opacity-100 transition-opacity">
              <TaskActionMenu task={task} />
           </div>
        </div>

        {/* 3. Main Content: Title & Description */}
        <div className="mb-6 flex-1 w-full min-w-0">
          {/* Title: Clamp to 2 lines, break words to fix wrapping */}
          <h3 className="text-lg font-bold text-base-content mb-2 leading-tight line-clamp-2 break-words text-ellipsis w-full group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          
          {/* Description: Clamp to 3 lines */}
          <p className="text-sm text-base-content/70 font-light leading-relaxed line-clamp-3 break-words text-ellipsis w-full">
            {task.description || "No description provided."}
          </p>
        </div>

        {/* 4. Footer: Metadata (Due Date, Assignee) */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto w-full">
           
           {/* Due Date with enhanced alerts */}
           {task.due_date ? (
              <div className={`flex items-center gap-1.5 text-xs font-medium font-mono ${
                 isOverdue ? "text-neon-red animate-pulse" : "text-zinc-500 group-hover:text-zinc-300 transition-colors"
              }`}>
                 <CalendarIcon className="h-3.5 w-3.5" />
                 <span>{new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                 {isOverdue && <span className="text-[10px] font-bold uppercase ml-1">(!OVERDUE)</span>}
              </div>
           ) : (
              <span className="text-xs text-zinc-600 font-mono">No Due Date</span>
           )}

           {/* Assignee Indicator (Simple Initial for now, could be avatar) */}
           {task.assigned_to && (
             <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300 pointer-events-none" title={`Assigned to ID: ${task.assigned_to}`}>
                <span className="sr-only">Assigned</span>
                U{task.assigned_to}
             </div>
           )}
        </div>
      </div>
      
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
