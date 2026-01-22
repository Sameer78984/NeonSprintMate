/**
 * LandingStatusBar Component
 * 
 * Displays system status information at the top of the landing page.
 * Shows node status, sync latency, and protocol version.
 * 
 * @returns {JSX.Element} Status bar component
 */
export const LandingStatusBar = () => {
  return (
    <div className="w-full border-b border-white/5 bg-black/60 backdrop-blur-md py-3 px-4 md:px-8 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 z-50 sticky top-0 font-mono">
      <div className="flex items-center gap-3 md:gap-6">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          <span className="hidden xs:inline">Node:</span> Stable
        </span>
        <span className="hidden sm:inline">Sync Latency: 14ms</span>
      </div>
      <div className="truncate pl-4">
        Clearance: Level 1 // Protocol: v4.2
      </div>
    </div>
  );
};
