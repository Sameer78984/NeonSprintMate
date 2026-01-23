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

import { LandingHeader } from "../components/LandingHeader";
import { LandingFooter } from "../components/LandingFooter";

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
    <div className="h-full bg-transparent text-white selection:bg-neon-cyan/30 overflow-x-hidden relative font-sans">
      <LandingStatusBar />
      <LandingHeader isAuthenticated={isAuthenticated} />

      <main className="container mx-auto px-6 relative z-10 flex flex-col items-center pt-32 md:pt-40 pb-32">
        <LandingHero isAuthenticated={isAuthenticated} />

        {/* Feature Orbs (Responsive Grid) */}
        <div className="relative w-full mt-32 md:mt-48 max-w-6xl">
          {/* Ambient Glows behind cards */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none mix-blend-screen" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none mix-blend-screen" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 w-full"
          >
            <FeatureSphere
              icon={<BoltIcon />}
              title="Real-Time Sync"
              desc="Optimistic state management ensures zero-latency feedback loops for every member."
              color="cyan"
            />
            <FeatureSphere
              icon={<GlobeAltIcon />}
              title="Global Infrastructure"
              desc="Resilient, globally distributed data layers powered by Neon PostgreSQL architecture."
              color="purple"
            />
            <FeatureSphere
              icon={<ShieldCheckIcon />}
              title="Enterprise Security"
              desc="Enterprise-grade encryption and automated threat detection protect mission-critical data."
              color="blue"
            />
          </motion.div>
        </div>

        <LandingVision />
      </main>

      <LandingFooter />
    </div>
  );
};
