/**
 * LandingBackground Component
 * 
 * Provides the ambient background effects for the landing page.
 * Includes animated gradient orbs and grid pattern overlay.
 * 
 * @returns {JSX.Element} Background container with animated effects
 */
export const LandingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow" />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-cyan/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:30px_30px] md:bg-[length:40px_40px] opacity-15 animate-grid-slow [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
};
