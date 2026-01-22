/**
 * Animation variants for landing page components
 * 
 * These variants are used with framer-motion to create staggered
 * animations for better visual hierarchy and user experience.
 */

/**
 * Container variant for staggered children animations
 * Creates a cascading effect where children animate in sequence
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

/**
 * Item variant for individual animated elements
 * Uses spring physics for natural motion
 */
export const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};
