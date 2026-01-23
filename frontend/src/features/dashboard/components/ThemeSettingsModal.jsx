import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const ThemeSettingsModal = ({ isOpen, onClose }) => {
  const {
    bgStyle, setBgStyle,
    rainSpeed, setRainSpeed,
    rainAmount, setRainAmount,
    snowSpeed, setSnowSpeed,
    snowAmount, setSnowAmount,
    enableParticles, setEnableParticles
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
           className="relative w-full max-w-lg bg-zinc-900 border border-neon-cyan/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)] max-h-[90vh] overflow-y-auto"
        >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <PaintBrushIcon className="h-6 w-6 text-neon-cyan" />
                    <h2 className="text-xl font-bold text-white">Theme Details</h2>
                </div>
                <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>

            <div className="space-y-8">
                {/* Background Style Selector */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Environment</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['grid', 'aurora', 'nebula', 'cyber_rain', 'snow', 'cherry_blossoms', 'fireflies', 'matrix', 'minimal'].map((style) => (
                           <button
                             key={style}
                             onClick={() => setBgStyle(style)}
                             className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                                 bgStyle === style 
                                 ? "border-neon-cyan bg-neon-cyan/20 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                                 : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                             }`}
                           >
                               {style.replace('_', ' ').toUpperCase()}
                           </button> 
                        ))}
                    </div>
                </div>

                {/* Rain Controls */}
                {bgStyle === 'cyber_rain' && (
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <label className="text-sm font-bold text-neon-cyan uppercase">Rain Config</label>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Speed (x{rainSpeed})</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.5" 
                                max="5" 
                                step="0.5"
                                value={rainSpeed}
                                onChange={(e) => setRainSpeed(Number(e.target.value))}
                                className="w-full accent-neon-cyan"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Density ({rainAmount})</span>
                            </div>
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                step="10"
                                value={rainAmount}
                                onChange={(e) => setRainAmount(Number(e.target.value))}
                                className="w-full accent-neon-cyan"
                            />
                        </div>
                    </div>
                )}

                {/* Snow Controls */}
                {bgStyle === 'snow' && (
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                         <label className="text-sm font-bold text-white uppercase">Snow Config</label>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Speed (x{snowSpeed})</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.5" 
                                max="3" 
                                step="0.5"
                                value={snowSpeed}
                                onChange={(e) => setSnowSpeed(Number(e.target.value))}
                                className="w-full accent-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Flurries ({snowAmount})</span>
                            </div>
                            <input 
                                type="range" 
                                min="20" 
                                max="200" 
                                step="10"
                                value={snowAmount}
                                onChange={(e) => setSnowAmount(Number(e.target.value))}
                                className="w-full accent-white"
                            />
                        </div>
                    </div>
                )}
                
                {/* Global Particles */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div>
                        <div className="text-sm font-medium text-white">Interactive Particles</div>
                        <div className="text-xs text-zinc-500">Enable mouse-reactive dust</div>
                    </div>
                    <button 
                        onClick={() => setEnableParticles(!enableParticles)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                            enableParticles ? "bg-neon-cyan" : "bg-zinc-700"
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
