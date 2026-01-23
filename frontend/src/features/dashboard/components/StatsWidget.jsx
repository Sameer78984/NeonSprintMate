import { useMemo } from "react";
import { useTaskStore } from "../../../stores/useTaskStore";

export const StatsWidget = () => {
  const { tasks } = useTaskStore();
  
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const progress = tasks.filter(t => t.status === 'in_progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    
    return { total, done, progress, todo };
  }, [tasks]);

  if (stats.total === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
       <h3 className="font-bold text-lg uppercase tracking-widest text-white">Current Status</h3>
       
       <div className="space-y-3">
          {/* Progress Bars */}
          <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="text-neon-purple">In Progress</span>
               <span className="text-white">{stats.progress}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-neon-purple shadow-[0_0_10px_var(--color-neon-purple)]" 
                  style={{ width: `${(stats.progress / stats.total) * 100}%` }} 
               />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="text-neon-cyan">Completed</span>
               <span className="text-white">{stats.done}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)]" 
                  style={{ width: `${(stats.done / stats.total) * 100}%` }} 
               />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="text-zinc-400">Todo</span>
               <span className="text-white">{stats.todo}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-white/20" 
                  style={{ width: `${(stats.todo / stats.total) * 100}%` }} 
               />
            </div>
          </div>
       </div>
    </div>
  );
};
