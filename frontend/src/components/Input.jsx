import React from "react";
import { motion } from "framer-motion";

/**
 * Global Input Component for NeonSprintMate
 * Supports icons, error states, and neon focus effects.
 */
const Input = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex flex-col space-y-2 w-full ${className}`}
    >
      {/* Monospace Label for Terminal Vibe */}
      {label && (
        <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-4 font-bold font-mono">
          {label}{" "}
          {required && <span className="text-neon-cyan opacity-50">*</span>}
        </label>
      )}

      <div className="relative group">
        {/* Leading Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-neon-cyan text-zinc-600">
            <Icon className="h-5 w-5" />
          </div>
        )}

        {/* The Glass Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full bg-black/60 border rounded-2xl py-4 pr-4 
            text-sm transition-all duration-300 glass-panel
            placeholder:text-zinc-800 focus:outline-none
            ${Icon ? "pl-12" : "pl-6"}
            ${
              error
                ? "border-red-500/50 focus:border-red-500 neon-glow-red"
                : "border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/10"
            }
          `}
          {...props}
        />

        {/* Animated Focus Border (Bottom Line) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 group-focus-within:w-1/2 bg-neon-cyan transition-all duration-500 opacity-50" />
      </div>

      {/* Error Message Protocol */}
      {error && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] text-red-500 uppercase font-mono tracking-tighter ml-4 mt-1"
        >
          ! Alert: {error}
        </motion.span>
      )}
    </motion.div>
  );
};

export default Input;
