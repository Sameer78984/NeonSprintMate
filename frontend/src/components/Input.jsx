import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
  const [showPassword, setShowPassword] = useState(false);
  const controls = useAnimation(); // Control for shake animation

  // Determine actual input type (toggle between password and text)
  const inputType = type === "password" && showPassword ? "text" : type;

  // Handle typing with subtle shake effect
  const handleChange = (e) => {
    onChange(e);
    
    // Performance optimized shake: minimal x-axis movement
    // Only triggers a subtle tactile feedback
    controls.start({
      x: [0, -2, 2, -1, 1, 0],
      transition: { duration: 0.2, ease: "linear" }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col space-y-2 w-full ${className}`}
    >
      {label && (
        <label
          className={`text-xs ml-4 font-medium transition-colors duration-300 ${
            isErrorField ? "text-red-500" : "text-base-content/60"
          }`}
        >
          {label}{" "}
          {required && <span className="text-primary opacity-50">*</span>}
        </label>
      )}

      <motion.div 
        className="relative group"
        animate={controls}
      >
        {Icon && (
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              isErrorField
                ? "text-red-500"
                : "text-base-content/60 group-focus-within:text-primary"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}

        {/* The Input Field: Handles the Red Border & Glow */}
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full bg-base-100/50 border rounded-2xl py-4 pr-4 
            text-sm transition-all duration-300 glass-panel
            placeholder:text-base-content/30 focus:outline-none text-base-content
            ${Icon ? "pl-12" : "pl-6"}
            ${type === "password" ? "pr-12" : "pr-4"}
            ${
              isErrorField
                ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                : "border-base-content/10 focus:border-primary/50"
            }
          `}
          {...props}
        />

        {/* Password Toggle Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
               isErrorField ? 'text-red-500' : 'text-base-content/40 hover:text-primary'
            }`}
            tabIndex={-1} // Prevent tabbing to this button before input
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Animated Bottom Line: Switches color on error */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 group-focus-within:w-1/2 transition-all duration-500 opacity-50 ${
            isErrorField ? "bg-red-500" : "bg-primary"
          }`}
        />
      </motion.div>

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
