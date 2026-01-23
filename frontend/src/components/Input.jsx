import React from "react";
import { motion } from "framer-motion";

const Input = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error, // Text to display
  isErrorField, // Boolean to trigger red border
  required = false,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col space-y-2 w-full ${className}`}
    >
      {label && (
        <label
          className={`text-xs ml-4 font-medium transition-colors duration-300 ${
            isErrorField ? "text-red-500" : "text-gray-300"
          }`}
        >
          {label}{" "}
          {required && <span className="text-neon-cyan opacity-50">*</span>}
        </label>
      )}

      <div className="relative group">
        {Icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              isErrorField
                ? "text-red-500"
                : "text-zinc-600 group-focus-within:text-neon-cyan"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}

        {/* The Input Field: Handles the Red Border & Glow */}
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
              isErrorField
                ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                : "border-white/10 focus:border-neon-cyan/50"
            }
          `}
          {...props}
        />

        {/* Animated Bottom Line: Switches color on error */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 group-focus-within:w-1/2 transition-all duration-500 opacity-50 ${
            isErrorField ? "bg-red-500" : "bg-neon-cyan"
          }`}
        />
      </div>

      {/* Static Error Message */}
      {error && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[9px] text-red-500 uppercase font-mono tracking-tighter ml-4 mt-1 italic"
        >
          ! Alert: {error}
        </motion.span>
      )}
    </motion.div>
  );
};

export { Input };
