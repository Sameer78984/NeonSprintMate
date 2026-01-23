import { motion } from "framer-motion";
import { useThemeStore } from "../../../stores/useThemeStore";

/**
 * LandingVision Component
 * 
 * Displays the vision statement section at the bottom of the landing page.
 * 
 * @returns {JSX.Element} Vision section component
 */
export const LandingVision = () => {
  const { mode } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-48 md:mt-64 w-full max-w-4xl p-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] md:rounded-[3rem]"
    >
      <div className={`${mode === 'light' ? 'bg-white/90 border-gray-200' : 'bg-[#050505] border-white/5'} backdrop-blur-md p-10 md:p-16 rounded-[1.9rem] md:rounded-[2.9rem] text-center border shadow-2xl`}>
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-base-content">
          Built for the{" "}
          <span className="text-primary italic">Future of Work</span>
        </h2>
        <p className="text-base-content/60 leading-relaxed font-light text-sm md:text-lg max-w-2xl mx-auto">
          Discard legacy tools that slow you down. NeonSprintMate combines 
          <span className="font-bold text-base-content"> lightning-fast task management</span>, 
          <span className="font-bold text-base-content"> team collaboration</span>, and 
          <span className="font-bold text-base-content"> powerful analytics</span> into one cohesive workspace.
        </p>
      </div>
    </motion.div>
  );
};
