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
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center relative overflow-x-hidden p-4 font-sans">
      {/* Responsive Ambient Background */}


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
