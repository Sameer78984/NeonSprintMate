import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "../utils/animations";

/**
 * LandingHero Component
 * 
 * Main hero section of the landing page with title, description, and CTA button.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @returns {JSX.Element} Hero section component
 */
export const LandingHero = ({ isAuthenticated }) => {
  return (
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
  );
};
