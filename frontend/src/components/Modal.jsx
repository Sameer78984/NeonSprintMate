import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * Modal Component
 * 
 * Reusable modal wrapper with backdrop, animations, and close functionality.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.maxWidth - Max width class (e.g., "max-w-lg", "max-w-xl")
 * @param {number} props.zIndex - Z-index for the modal (default: 200)
 * @param {string} props.accentColor - Accent color for top border ('cyan' | 'purple' | 'mixed')
 * @returns {JSX.Element} Modal component
 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-lg",
  zIndex = 200,
  accentColor = "cyan",
}) => {
  const accentGradients = {
    cyan: "from-neon-cyan via-neon-purple to-neon-cyan",
    purple: "from-transparent via-neon-purple to-transparent",
    mixed: "from-neon-purple via-neon-cyan to-neon-purple",
  };

  const backdropClasses = {
    200: "bg-black/85 backdrop-blur-md",
    300: "bg-black/90 backdrop-blur-md",
  };

  const backdropClass = backdropClasses[zIndex] || backdropClasses[200];
  const contentZIndex = zIndex + 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 ${backdropClass}`}
            style={{ zIndex }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
            style={{ zIndex: contentZIndex }}
          >
            <div
              className={`w-full ${maxWidth} bg-deep-black border border-white/10 rounded-[2.5rem] shadow-2xl pointer-events-auto relative`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${accentGradients[accentColor]} animate-pulse`}
              />
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * ModalHeader Component
 * 
 * Reusable modal header with icon, title, and close button.
 * 
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.icon - Icon component
 * @param {string} props.title - Modal title
 * @param {Function} props.onClose - Function to close the modal
 * @param {'cyan'|'purple'} props.color - Color theme
 * @returns {JSX.Element} Modal header component
 */
export const ModalHeader = ({ icon: Icon, title, onClose, color = "cyan" }) => {
  const colorClasses = {
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
  };

  return (
    <div className="flex justify-between items-center mb-10 px-10 pt-10">
      <h3
        className={`text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3 ${colorClasses[color]}`}
      >
        {Icon && <Icon className={`h-6 w-6 ${colorClasses[color]}`} />}
        {title}
      </h3>
      <button
        onClick={onClose}
        className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
