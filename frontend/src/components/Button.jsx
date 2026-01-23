import React from "react";
import { motion } from "framer-motion";

/**
 * Global Button Component for NeonSprintMate
 * Supports 'cyan' (Primary) and 'purple' (Secondary) variants.
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "cyan",
  loading = false,
  disabled = false,
  className = "",
}) => {
  const variants = {
    cyan: "from-neon-cyan to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    purple:
      "from-neon-purple to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    pink: "from-neon-pink to-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    lime: "from-neon-lime to-green-600 shadow-[0_0_20px_rgba(132,204,22,0.2)]",
    orange:
      "from-neon-orange to-amber-600 shadow-[0_0_20px_rgba(249,115,22,0.2)]",
    outline: "border border-white/10 hover:bg-white/5", // Added basic outline variant
  };

  const glowColors = {
    cyan: "bg-neon-cyan",
    purple: "bg-neon-purple",
    pink: "bg-neon-pink",
    lime: "bg-neon-lime",
    orange: "bg-neon-orange",
    outline: "bg-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        group relative inline-flex items-center justify-center 
        px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Background Glow Layer */}
      {variant !== "outline" && (
        <div
          className={`
        absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity blur-md
        bg-gradient-to-r ${variants[variant]}
      `}
        />
      )}

      {/* Solid Inner Core (The "Glass" effect) */}
      <div className="absolute inset-[1px] bg-black rounded-[15px] z-0" />

      {/* Content Container */}
      <span className="relative z-10 flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-white">
        {loading ? (
          <>
            <span className="loading loading-spinner loading-xs text-white"></span>
            Synchronizing...
          </>
        ) : (
          children
        )}
      </span>

      {/* Bottom Interactive Accent Line */}
      <div
        className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 
        group-hover:w-1/2 transition-all duration-500
        ${glowColors[variant]} opacity-50
      `}
      />
    </motion.button>
  );
};

export { Button };
