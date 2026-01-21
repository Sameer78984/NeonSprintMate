import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../stores/useAuthStore";

// --- Responsive Animation Orchestration ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const floatingVariant = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 0.5, -0.5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="h-full bg-deep-black text-white selection:bg-neon-cyan/30 overflow-x-hidden relative font-sans">
      {/* --- Responsive Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-cyan/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] md:bg-[length:40px_40px] opacity-15 animate-grid-slow [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* --- Real-Time Status Ticker (Responsive) --- */}
      <div className="w-full border-b border-white/5 bg-black/60 backdrop-blur-md py-3 px-4 md:px-8 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 z-50 sticky top-0 font-mono">
        <div className="flex items-center gap-3 md:gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span className="hidden xs:inline">Node:</span> Stable
          </span>
          <span className="hidden sm:inline">Sync Latency: 14ms</span>
        </div>
        <div className="truncate pl-4">
          Clearance: Level 1 // Protocol: v4.2
        </div>
      </div>

      <main className="container mx-auto px-6 relative z-10 flex flex-col items-center pt-16 md:pt-24 pb-32">
        {/* --- Hero Section --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-[9px] md:text-[10px] font-bold mb-6 md:mb-8 tracking-[0.3em] md:tracking-[0.4em] uppercase neon-glow-cyan"
          >
            Unified Engineering Protocol
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.9] md:leading-[0.85] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            ORCHESTRATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              TOTAL VELOCITY
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-500 text-base md:text-xl lg:text-2xl mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            SprintMate transforms fragmented workflows into a high-frequency
            neural network. Engineered for teams that prioritize speed over
            everything.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] text-white transition-all duration-300 rounded-full overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-md opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="absolute inset-[2px] bg-black rounded-full z-0" />
              <span className="relative z-10 flex items-center gap-3">
                {isAuthenticated
                  ? "ENTER COMMAND CENTER"
                  : "INITIALIZE INTERFACE"}
                <RocketLaunchIcon className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-45 transition-transform duration-500" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* --- Feature Orbs (Responsive Grid) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 max-w-6xl w-full mt-32 md:mt-48"
        >
          <FeatureSphere
            icon={<BoltIcon />}
            title="Quantum Sync"
            desc="Optimistic state management ensures zero-latency feedback loops for every operative."
            color="cyan"
          />
          <FeatureSphere
            icon={<GlobeAltIcon />}
            title="Neural Nexus"
            desc="Resilient, globally distributed data layers powered by Neon PostgreSQL architecture."
            color="purple"
          />
          <FeatureSphere
            icon={<ShieldCheckIcon />}
            title="Ironclad Shield"
            desc="Enterprise-grade encryption and automated threat detection protect mission-critical data."
            color="blue"
          />
        </motion.div>

        {/* --- Vision Block (Responsive) --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-48 md:mt-64 w-full max-w-4xl p-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] md:rounded-[3rem]"
        >
          <div className="bg-[#050505] p-10 md:p-16 rounded-[1.9rem] md:rounded-[2.9rem] text-center border border-white/5">
            <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">
              Built for the{" "}
              <span className="text-zinc-500 italic">Next Epoch</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-lg">
              Traditional management tools are built for the past. SprintMate is
              engineered for the future of decentralized development and rapid
              coordination.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 md:py-20 border-t border-white/5 text-center text-zinc-700 text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase">
        © 2026 SPRINTMATE SYSTEMS // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};

// --- Enhanced Feature Sphere Component ---
const FeatureSphere = ({ icon, title, desc, color }) => {
  const themes = {
    cyan: "from-neon-cyan to-blue-600 shadow-neon-cyan/30",
    purple: "from-neon-purple to-indigo-600 shadow-neon-purple/30",
    blue: "from-blue-600 to-zinc-800 shadow-blue-500/30",
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div
        variants={floatingVariant}
        animate="animate"
        className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-8 md:mb-10"
      >
        {/* Neon Glow Layer */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${themes[color]} blur-[30px] md:blur-[45px] opacity-20 group-hover:opacity-60 transition-opacity duration-700`}
        />

        {/* Sphere Container */}
        <div className="absolute inset-0 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden glass-panel">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          <div className="w-12 h-12 md:w-20 md:h-20 text-zinc-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            {icon}
          </div>
        </div>
      </motion.div>
      <h3 className="text-lg md:text-xl font-black mb-3 md:mb-4 tracking-widest uppercase">
        {title}
      </h3>
      <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed px-4 md:px-6">
        {desc}
      </p>
    </motion.div>
  );
};

export default LandingPage;
