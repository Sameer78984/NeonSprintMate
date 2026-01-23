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
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center relative overflow-hidden p-4 font-sans">


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
