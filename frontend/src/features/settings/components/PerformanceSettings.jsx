import { BoltIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const PerformanceSettings = ({ compact = false }) => {
    const { performanceMode, setPerformanceMode } = useThemeStore();

    const modes = [
        { id: 'high', label: 'Maximum', desc: 'Full effects, shadows, and blur.', color: 'text-error' },
        { id: 'balanced', label: 'Balanced', desc: 'Optimized effects. Best for most devices.', color: 'text-warning' },
        { id: 'low', label: 'Power Saver', desc: 'No blur, reduced effects. Maximum speed.', color: 'text-success' },
    ];

    return (
        <section className={`animate-fadeIn ${compact ? "space-y-4" : "space-y-6"}`}>
            {!compact && (
                <div className="flex items-center gap-3 text-base-content border-b border-base-content/10 pb-4">
                <BoltIcon className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl font-bold uppercase tracking-widest">Performance & Battery</h2>
                </div>
            )}
            
            <div className={`grid ${compact ? 'grid-cols-3 gap-2' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setPerformanceMode(mode.id)}
                        className={`rounded-xl border text-left transition-all ${
                            performanceMode === mode.id
                            ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--p),0.2)]"
                            : "border-base-content/10 hover:bg-base-content/5"
                        } ${compact ? "p-2" : "p-4"}`}
                    >
                        <div className={`flex items-center justify-between ${compact ? "mb-1" : "mb-2"}`}>
                            <span className={`${compact ? "text-[10px]" : "text-sm"} font-bold uppercase ${performanceMode === mode.id ? 'text-primary' : 'text-base-content'}`}>
                                {mode.label}
                            </span>
                             {performanceMode === mode.id && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--p)]" />}
                        </div>
                        {!compact && (
                            <p className="text-xs text-base-content/60 leading-relaxed">
                                {mode.desc}
                            </p>
                        )}
                    </button>
                ))}
            </div>
            
            {!compact && (
                <div className="p-4 rounded-lg bg-base-content/5 border border-base-content/5 text-xs text-base-content/50 italic text-center">
                    'Power Saver' mode disables background blurs and reduces particle counts to save battery and improve FPS on older devices.
                </div>
            )}
        </section>
    );
};
