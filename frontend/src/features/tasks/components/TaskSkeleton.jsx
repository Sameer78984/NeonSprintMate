export const TaskSkeleton = () => {
  return (
    <div className="glass-panel p-8 rounded-[2.5rem] bg-black/40 border border-white/5 h-[300px] flex flex-col relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Header (Status & Menu) */}
      <div className="flex justify-between mb-8">
        <div className="h-6 w-20 bg-white/5 rounded-full animate-pulse" />
        <div className="h-8 w-8 bg-white/5 rounded-full animate-pulse" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-6">
        <div className="h-6 w-3/4 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-6 w-1/2 bg-white/5 rounded-lg animate-pulse" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-auto">
        <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
        <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
};
