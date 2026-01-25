import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const DensitySettings = () => {
    const { density, setDensity } = useThemeStore();

    return (
        <section className="space-y-6">
             <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <ComputerDesktopIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold uppercase tracking-widest">Interface Density</h2>
            </div>

            <div className="glass-panel p-8 rounded-3xl space-y-8">
                <div className="flex justify-between text-zinc-400 text-xs uppercase tracking-widest font-mono">
                    <span>Information Dense</span>
                    <span>Comfortable</span>
                    <span>Spacious</span>
                </div>
                <input 
                    type="range" 
                    min="0.8" 
                    max="1.2" 
                    step="0.1"
                    value={density}
                    onChange={(e) => setDensity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple hover:accent-neon-cyan transition-colors"
                    style={{
                         backgroundImage: `linear-gradient(to right, 
                            #d946ef 0%, 
                            #d946ef ${((density - 0.8) / 0.4) * 100}%, 
                            rgba(255,255,255,0.1) ${((density - 0.8) / 0.4) * 100}%, 
                            rgba(255,255,255,0.1) 100%)`
                    }}
                />
                <p className="text-center text-sm text-white font-bold">
                    Current Scale: {Math.round(density * 100)}%
                </p>
            </div>

            <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm">
                <strong className="block mb-2 text-orange-400 uppercase tracking-widest text-xs">Note</strong>
                Changing density scales the entire application interface. Some layouts may require a refresh to recalculate correctly.
             </div>
        </section>
    );
};
