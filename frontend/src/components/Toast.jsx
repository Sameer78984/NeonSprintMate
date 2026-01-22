import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Toast = ({ message, type }) => {
  const styles = {
    cyan: "border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    purple:
      "border-neon-purple/50 text-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    error:
      "border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
  };

  const icons = {
    cyan: <CheckCircleIcon className="h-5 w-5" />,
    purple: <InformationCircleIcon className="h-5 w-5" />,
    error: <ExclamationTriangleIcon className="h-5 w-5" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        glass-panel border-l-4 p-4 rounded-xl flex items-center gap-4 
        min-w-[300px] backdrop-blur-2xl bg-black/80 z-[100]
        relative overflow-hidden {/* Added relative to position the line */}
        ${styles[type]}
      `}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 mb-1">
        {" "}
        {/* Added slight bottom margin for breathing room */}
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold opacity-50 mb-1">
          System_Alert
        </p>
        <p className="text-xs font-medium tracking-wide text-white">
          {message}
        </p>
      </div>

      {/* --- MOVED & MODIFIED ANIMATED LINE --- */}
      {/* Now absolute at bottom, horizontal (h-[1px] right-0 left-0) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[1px] opacity-30 animate-pulse bg-current`}
      />
    </motion.div>
  );
};

export { Toast };
