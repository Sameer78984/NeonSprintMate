import { motion } from "framer-motion";

/**
 * Animation variant for floating effect
 * Creates a smooth up-and-down motion with slight rotation
 */
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

/**
 * FeatureSphere Component
 * 
 * Displays a floating sphere with icon, title, and description.
 * Used in the landing page to showcase key features.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Feature title
 * @param {string} props.desc - Feature description
 * @param {'cyan'|'purple'|'blue'} props.color - Color theme for the sphere
 * @returns {JSX.Element} Feature sphere component
 */
export const FeatureSphere = ({ icon, title, desc, color }) => {
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
