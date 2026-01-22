import { motion } from "framer-motion";
import { useAuthStore } from "../../../stores/useAuthStore";
import {
  BoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { LandingBackground } from "../components/LandingBackground";
import { LandingStatusBar } from "../components/LandingStatusBar";
import { LandingHero } from "../components/LandingHero";
import { LandingVision } from "../components/LandingVision";
import { FeatureSphere } from "../components/FeatureSphere";
import { containerVariants } from "../utils/animations";

/**
 * LandingPage Component
 * 
 * Main landing page showcasing the application's features and value proposition.
 * Includes hero section, feature showcase, and vision statement.
 * 
 * @returns {JSX.Element} Landing page component
 */
export const LandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="h-full bg-deep-black text-white selection:bg-neon-cyan/30 overflow-x-hidden relative font-sans">
      <LandingBackground />
      <LandingStatusBar />

      <main className="container mx-auto px-6 relative z-10 flex flex-col items-center pt-16 md:pt-24 pb-32">
        <LandingHero isAuthenticated={isAuthenticated} />

        {/* Feature Orbs (Responsive Grid) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 max-w-6xl w-full mt-32 md:mt-48"
        >
          <FeatureSphere
            icon={<BoltIcon />}
            title="Quantum Sync"
            desc="Optimistic state management ensures zero-latency feedback loops for every operative."
            color="cyan"
          />
          <FeatureSphere
            icon={<GlobeAltIcon />}
            title="Neural Nexus"
            desc="Resilient, globally distributed data layers powered by Neon PostgreSQL architecture."
            color="purple"
          />
          <FeatureSphere
            icon={<ShieldCheckIcon />}
            title="Ironclad Shield"
            desc="Enterprise-grade encryption and automated threat detection protect mission-critical data."
            color="blue"
          />
        </motion.div>

        <LandingVision />
      </main>

      <footer className="py-12 md:py-20 border-t border-white/5 text-center text-zinc-700 text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase">
        © 2026 SPRINTMATE SYSTEMS // ALL RIGHTS RESERVED
      </footer>
    </div>
  );
};
