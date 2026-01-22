import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useTaskStore } from "../../../stores/useTaskStore";

const TaskActionMenu = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask, updateTaskStatus } = useTaskStore();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-zinc-600 hover:text-neon-cyan transition-colors p-1"
      >
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
          >
            <button
              onClick={() => {
                updateTaskStatus(task.id, "in_progress");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-neon-purple hover:bg-white/5 rounded-xl transition-all"
            >
              <ArrowPathIcon className="h-4 w-4" /> Start_Process
            </button>
            <button
              onClick={() => {
                updateTaskStatus(task.id, "done");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-neon-cyan hover:bg-white/5 rounded-xl transition-all"
            >
              <CheckCircleIcon className="h-4 w-4" /> Complete_Task
            </button>
            <div className="h-[1px] bg-white/5 my-2" />
            <button
              onClick={() => deleteTask(task.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
            >
              <TrashIcon className="h-4 w-4" /> Terminate_Node
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskActionMenu;
