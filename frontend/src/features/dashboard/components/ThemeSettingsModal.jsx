import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PaintBrushIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const ThemeSettingsModal = ({ isOpen, onClose }) => {
  const {
    bgStyle, setBgStyle,
    rainSpeed, setRainSpeed,
    rainAmount, setRainAmount,
    snowSpeed, setSnowSpeed,
    snowAmount, setSnowAmount,
    enableParticles, setEnableParticles,
    mode, setMode
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

            <div className="space-y-8">
                {/* Background Style Selector */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Environment</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['grid', 'aurora', 'nebula', 'cyber_rain', 'snow', 'cherry_blossoms', 'fireflies', 'matrix', 'minimal'].map((style) => (
                           <button
                             key={style}
                             onClick={() => setBgStyle(style)}
                             className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
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

                {/* Snow Controls */}
                {bgStyle === 'snow' && (
                    <div className="space-y-4 p-4 rounded-xl bg-base-content/5 border border-base-content/5">
                         <label className="text-sm font-bold text-base-content uppercase">Snow Config</label>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-base-content/60">
                                <span>Speed (x{snowSpeed})</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.5" 
                                max="3" 
                                step="0.5"
                                value={snowSpeed}
                                onChange={(e) => setSnowSpeed(Number(e.target.value))}
                                className="w-full accent-base-content"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-base-content/60">
                                <span>Flurries ({snowAmount})</span>
                            </div>
                            <input 
                                type="range" 
                                min="20" 
                                max="200" 
                                step="10"
                                value={snowAmount}
                                onChange={(e) => setSnowAmount(Number(e.target.value))}
                                className="w-full accent-base-content"
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
