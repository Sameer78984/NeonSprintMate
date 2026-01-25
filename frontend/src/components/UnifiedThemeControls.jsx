import { motion } from "framer-motion";
import { useThemeStore } from "../stores/useThemeStore";

export const UnifiedThemeControls = ({ compact = false }) => {
    const { 
        bgScene, setBgScene,
        bgEffect, setBgEffect,
        bgAnimationSpeed, setBgAnimationSpeed, 
        enableParticles, setEnableParticles,
        rainSpeed, setRainSpeed, 
        rainAmount, setRainAmount,
        rainCollision, setRainCollision,
        rainThickness, setRainThickness,
        snowSpeed, setSnowSpeed, 
        snowAmount, setSnowAmount 
    } = useThemeStore();

    // Reusable styles based on compact prop
    const gridStyle = compact ? "grid-cols-3 gap-2" : "grid-cols-3 gap-3";
    const btnStyle = (active) => `
        ${compact ? "px-2 py-2 text-[10px]" : "p-3 text-xs"}
        rounded-lg border font-bold uppercase transition-all cursor-pointer
        ${active 
            ? "border-primary bg-primary/20 text-primary shadow-[0_0_10px_rgba(var(--p),0.3)]" 
            : "border-base-content/10 bg-base-content/5 text-base-content/60 hover:bg-base-content/10"
        }
    `;

    return (
        <div className="space-y-6">
            
            {/* 1. SCENE SELECTOR */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-base-content/60 uppercase tracking-wider flex items-center gap-2">
                    <span>Background Scene</span>
                </label>
                <div className={`grid ${gridStyle}`}>
                        {['grid', 'aurora', 'galaxy', 'ocean', 'sunset', 'greenery', 'minimal'].map((scene) => (
                        <button
                            key={scene}
                            onClick={() => setBgScene(scene)}
                            className={btnStyle(bgScene === scene)}
                        >
                            {scene}
                        </button> 
                    ))}
                </div>
            </div>

            {/* 2. EFFECT SELECTOR */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-base-content/60 uppercase tracking-wider flex items-center gap-2">
                    <span>Weather & Effect</span>
                </label>
                <div className={`grid grid-cols-4 gap-2`}>
                        {['none', 'particles', 'rain_real', 'rain_cyber', 'snow', 'fireflies', 'matrix', 'fog'].map((effect) => (
                        <button
                            key={effect}
                            onClick={() => setBgEffect(effect)}
                            className={btnStyle(bgEffect === effect)}
                        >
                            {effect.replace('_', ' ')}
                        </button> 
                    ))}
                </div>
            </div>

            {/* 3. DETAILS & CONTROLS */}
            <div className={`rounded-xl border border-base-content/5 bg-base-content/5 ${compact ? "p-4 space-y-4" : "p-6 space-y-6"}`}>
                
                {/* Animation & Particles */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-base-content/60">
                            <span>Anim Speed</span>
                            <span className="text-primary font-mono">x{bgAnimationSpeed}</span>
                        </div>
                        <input 
                            type="range" min="0.1" max="5" step="0.1"
                            value={bgAnimationSpeed}
                            onChange={(e) => setBgAnimationSpeed(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-base-content/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                         <div className="leading-tight">
                            <span className="block text-xs font-bold text-base-content/80">Particles</span>
                            <span className="text-[10px] text-base-content/50">Mouse Interactive</span>
                         </div>
                         <input 
                              type="checkbox" 
                              checked={enableParticles} 
                              onChange={(e) => setEnableParticles(e.target.checked)} 
                              className="toggle toggle-xs toggle-primary"
                         />
                    </div>
                </div>

                {/* Rain Controls */}
                {(bgEffect === 'rain_real' || bgEffect === 'rain_cyber') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4 border-t border-base-content/5">
                        <label className="text-xs font-black text-primary uppercase tracking-widest block mb-2">Rain Configuration</label>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-base-content/60">
                                    <span>Intensity</span>
                                    <span className="text-primary font-mono">{rainAmount}</span>
                                </div>
                                <input type="range" min="10" max="100" step="10" value={rainAmount} onChange={(e) => setRainAmount(Number(e.target.value))} className="w-full h-1.5 bg-base-content/10 rounded-lg accent-primary" />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-base-content/60">
                                    <span>Speed</span>
                                    <span className="text-primary font-mono">x{rainSpeed}</span>
                                </div>
                                <input type="range" min="0.5" max="5" step="0.5" value={rainSpeed} onChange={(e) => setRainSpeed(Number(e.target.value))} className="w-full h-1.5 bg-base-content/10 rounded-lg accent-primary" />
                            </div>

                             <div className="space-y-2 col-span-2">
                                <div className="flex justify-between text-xs text-base-content/60">
                                    <span>Thickness</span>
                                    <span className="text-primary font-mono">{rainThickness}px</span>
                                </div>
                                <input type="range" min="0.5" max="3" step="0.5" value={rainThickness} onChange={(e) => setRainThickness(Number(e.target.value))} className="w-full h-1.5 bg-base-content/10 rounded-lg accent-primary" />
                            </div>

                            {bgEffect === 'rain_real' && (
                                 <div className="flex items-center justify-between col-span-2">
                                    <span className="text-xs text-base-content/60">Splash Physics on Bottom</span>
                                    <input type="checkbox" checked={rainCollision} onChange={(e) => setRainCollision(e.target.checked)} className="toggle toggle-xs toggle-info" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Snow Controls */}
                {bgEffect === 'snow' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-4 border-t border-base-content/5">
                         <label className="text-xs font-black text-base-content uppercase tracking-widest block mb-2">Snow Configuration</label>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-base-content/60">
                                    <span>Density</span>
                                    <span className="text-base-content font-mono">{snowAmount}</span>
                                </div>
                                <input type="range" min="20" max="200" step="10" value={snowAmount} onChange={(e) => setSnowAmount(Number(e.target.value))} className="w-full h-1.5 bg-base-content/10 rounded-lg accent-base-content" />
                            </div>
                             <div className="space-y-2">
                                <div className="flex justify-between text-xs text-base-content/60">
                                    <span>Fall Speed</span>
                                    <span className="text-base-content font-mono">x{snowSpeed}</span>
                                </div>
                                <input type="range" min="0.5" max="3" step="0.5" value={snowSpeed} onChange={(e) => setSnowSpeed(Number(e.target.value))} className="w-full h-1.5 bg-base-content/10 rounded-lg accent-base-content" />
                            </div>
                         </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
