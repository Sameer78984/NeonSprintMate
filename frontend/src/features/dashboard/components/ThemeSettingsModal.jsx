import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PaintBrushIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const ThemeSettingsModal = ({ isOpen, onClose, showPreview = true }) => {
  const {
    bgStyle, setBgStyle,
    rainSpeed, setRainSpeed,
    rainAmount, setRainAmount,
    enableParticles, setEnableParticles,
    mode, setMode,
    density, setDensity
  } = useThemeStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
           onClick={onClose}
        />
        
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.9, opacity: 0 }}
           className="relative w-full max-w-lg bg-base-100 border border-primary/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(var(--color-primary),0.2)] max-h-[90vh] overflow-y-auto"
        >
            <div className="flex justify-between items-center mb-6 border-b border-base-content/10 pb-4">
                <div className="flex items-center gap-3">
                    <PaintBrushIcon className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-base-content">Theme Details</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200 hover:bg-base-300 text-base-content/80 transition-colors mr-2"
                    >
                        {mode === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
                        <span className="text-xs font-bold">{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                    <button onClick={onClose} className="text-base-content/60 hover:text-base-content transition-colors">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Theme Preview Section - Conditionally Rendered */}
            {showPreview && (
                <div className="mb-6 p-4 rounded-2xl bg-base-100 border border-base-content/5 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-2 opacity-50">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-base-content/40">Preview</span>
                   </div>
                   
                   {/* Mock Mini Dashboard Card */}
                   <div className="flex gap-4 items-center mb-4">
                      <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(var(--color-primary),0.4)]">
                         <PaintBrushIcon className="h-5 w-5" />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-base-content leading-tight">Neon Theme</h3>
                         <p className="text-xs text-base-content/60 font-mono">Status: Active</p>
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-base-content/10 rounded-full" />
                      <div className="h-2 w-1/2 bg-base-content/10 rounded-full" />
                   </div>
                   
                   <div className="mt-4 flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-[0_0_10px_rgba(var(--color-primary),0.3)]">
                         Action
                      </button>
                      <button className="px-3 py-1.5 rounded-lg border border-base-content/10 text-base-content/60 text-xs font-bold hover:text-base-content hover:bg-base-content/5 transition-colors">
                         Cancel
                      </button>
                   </div>
                </div>
            )}

            <div className="space-y-8">
                {/* Background Style Selector */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Environment</label>
                    <div className="grid grid-cols-2 gap-2">
                         {['grid', 'aurora', 'nebula', 'cyber_rain', 'fireflies', 'matrix', 'minimal'].map((style) => (
                           <button
                             key={style}
                             onClick={() => setBgStyle(style)}
                             className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                                 bgStyle === style 
                                 ? "border-primary bg-primary/20 text-base-content shadow-[0_0_10px_rgba(var(--color-primary),0.3)]" 
                                 : "border-base-content/10 bg-base-content/5 text-base-content/60 hover:bg-base-content/10"
                             }`}
                           >
                               {style.replace('_', ' ').toUpperCase()}
                           </button> 
                        ))}
                    </div>
                </div>

                {/* Font Size Control */}
                <div className="space-y-4 p-4 rounded-xl bg-base-content/5 border border-base-content/5">
                     <label className="text-sm font-bold text-base-content uppercase">Interface Scale</label>
                     <div className="space-y-2">
                         <div className="flex justify-between text-xs text-base-content/60">
                             <span>Size ({Math.round(density * 100)}%)</span>
                         </div>
                         <input 
                             type="range" 
                             min="0.8" 
                             max="1.2" 
                             step="0.05"
                             value={density}
                             onChange={(e) => setDensity(Number(e.target.value))}
                             className="w-full accent-primary"
                         />
                     </div>
                </div>

                {/* Rain Controls */}
                {bgStyle === 'cyber_rain' && (
                    <div className="space-y-4 p-4 rounded-xl bg-base-content/5 border border-base-content/5">
                        <label className="text-sm font-bold text-primary uppercase">Rain Config</label>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-base-content/60">
                                <span>Speed (x{rainSpeed})</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.5" 
                                max="5" 
                                step="0.5"
                                value={rainSpeed}
                                onChange={(e) => setRainSpeed(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-base-content/60">
                                <span>Density ({rainAmount})</span>
                            </div>
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                step="10"
                                value={rainAmount}
                                onChange={(e) => setRainAmount(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>
                )}
                
                {/* Global Particles */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-base-content/5 border border-base-content/10">
                    <div>
                        <div className="text-sm font-medium text-base-content">Interactive Particles</div>
                        <div className="text-xs text-base-content/60">Enable mouse-reactive dust</div>
                    </div>
                    <button 
                        onClick={() => setEnableParticles(!enableParticles)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                            enableParticles ? "bg-primary" : "bg-base-content/30"
                        }`}
                    >
                         <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                             enableParticles ? "translate-x-6" : "translate-x-0"
                         }`} />
                    </button>
                </div>

            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
