import { motion } from "framer-motion";

export const NeonGlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-deep-black z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border border-neon-cyan/20 border-t-neon-cyan border-r-neon-purple/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        />
        
        {/* Inner Spinner */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-neon-purple/20 border-b-neon-purple border-l-neon-cyan/50"
        />

        {/* Center Logo/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                SM
            </span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-8 text-xs font-mono text-neon-cyan tracking-[0.3em] uppercase"
      >
        Initializing System...
      </motion.p>
    </div>
  );
};
