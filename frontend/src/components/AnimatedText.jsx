import { motion, AnimatePresence } from "framer-motion";

/**
 * AnimatedText Component
 * 
 * Animates text changes with a vertical slide and fade effect.
 * Useful for titles, status changes, and numbers.
 */
export const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
