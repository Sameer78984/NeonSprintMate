import { motion } from "framer-motion";
import { LoginForm } from "../components/LoginForm";

/**
 * LoginPage Component
 * 
 * Page wrapper for the login form with ambient background effects.
 * 
 * @returns {JSX.Element} Login page component
 */
export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-deep-black text-white flex items-center justify-center relative overflow-hidden p-4 font-sans">
      {/* Ambient Background Architecture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-cyan/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-10 animate-grid-slow [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[95%] sm:max-w-md"
      >
        <LoginForm />

        <p className="mt-8 text-center text-zinc-700 text-[9px] uppercase tracking-[0.5em] font-mono opacity-50">
          Security Protocol 88-Alpha Active
        </p>
      </motion.div>
    </div>
  );
};
