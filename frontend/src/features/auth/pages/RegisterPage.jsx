import { motion } from "framer-motion";
import { RegisterForm } from "../components/RegisterForm";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

/**
 * RegisterPage Component
 * 
 * Page wrapper for the registration form with ambient background effects.
 * 
 * @returns {JSX.Element} Registration page component
 */
export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-deep-black text-white flex items-center justify-center relative overflow-x-hidden p-4 font-sans">
      {/* Responsive Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-cyan/15 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] opacity-10 animate-grid-slow [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[95%] sm:max-w-md lg:max-w-lg"
      >
        <RegisterForm />
        <div className="mt-8 flex justify-center items-center gap-2 opacity-30">
          <ShieldCheckIcon className="h-4 w-4" />
          <p className="text-center text-[8px] uppercase tracking-[0.4em] font-mono">
            Biometric Encryption Active // RSA-4096
          </p>
        </div>
      </motion.div>
    </div>
  );
};
