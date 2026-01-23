import { motion } from "framer-motion";

/**
 * LandingVision Component
 * 
 * Displays the vision statement section at the bottom of the landing page.
 * 
 * @returns {JSX.Element} Vision section component
 */
export const LandingVision = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-48 md:mt-64 w-full max-w-4xl p-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] md:rounded-[3rem]"
    >
      <div className="bg-[#050505] p-10 md:p-16 rounded-[1.9rem] md:rounded-[2.9rem] text-center border border-white/5">
        <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">
          Built for the{" "}
          <span className="text-zinc-500 italic">Future of Work</span>
        </h2>
        <p className="text-zinc-500 leading-relaxed font-light text-sm md:text-lg">
          Traditional management tools are built for the past. NeonSprintMate is
          engineered for the future of agile development and rapid
          coordination.
        </p>
      </div>
    </motion.div>
  );
};
