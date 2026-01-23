import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  PlayIcon,
  ArrowPathIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useToastStore } from "../../../stores/useToastStore";

const TaskActionMenu = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask, updateTaskStatus } = useTaskStore();
  const { addToast } = useToastStore();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus);
    setIsOpen(false);
    // Optional: Add toast here if desired
    // addToast(`Task moved to ${newStatus.replace("_", " ")}`, "cyan");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      addToast("Task deleted", "error");
    }
    setIsOpen(false); 
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-base-content/60 hover:text-primary transition-colors p-1 rounded-full hover:bg-base-content/5 cursor-pointer"
        title="Task Actions"
      >
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-base-100/95 border border-base-content/10 backdrop-blur-xl rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
          >
            {/* Context Aware Actions */}
            {task.status === "todo" && (
              <button
                onClick={() => handleStatusChange("in_progress")}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-base-content/70 hover:text-neon-yellow hover:bg-base-content/5 rounded-xl transition-all cursor-pointer"
              >
                <PlayIcon className="h-4 w-4" /> Start Task
              </button>
            )}

            {task.status === "in_progress" && (
              <>
                 <button
                  onClick={() => handleStatusChange("done")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-base-content/70 hover:text-neon-green hover:bg-base-content/5 rounded-xl transition-all cursor-pointer"
                >
                  <CheckCircleIcon className="h-4 w-4" /> Complete Task
                </button>
                <button
                  onClick={() => handleStatusChange("todo")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-base-content/70 hover:text-neon-cyan hover:bg-base-content/5 rounded-xl transition-all cursor-pointer"
                >
                  <ArrowPathIcon className="h-4 w-4" /> Move to Queue
                </button>
              </>
            )}

            {task.status === "done" && (
               <button
                  onClick={() => handleStatusChange("in_progress")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-base-content/70 hover:text-neon-purple hover:bg-base-content/5 rounded-xl transition-all cursor-pointer"
                >
                  <ArrowPathIcon className="h-4 w-4" /> Reopen Task
                </button>
            )}
            
            <div className="h-[1px] bg-base-content/5 my-2" />
            
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
            >
              <TrashIcon className="h-4 w-4" /> Delete Task
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { TaskActionMenu };
