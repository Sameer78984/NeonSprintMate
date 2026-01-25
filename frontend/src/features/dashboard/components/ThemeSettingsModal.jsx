import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, PaintBrushIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";
import { UnifiedThemeControls } from "../../../components/UnifiedThemeControls";
import { TaskCard } from "../../tasks/components/TaskCard";
import { PerformanceSettings } from "../../settings/components/PerformanceSettings";

export const ThemeSettingsModal = ({ isOpen, onClose, showPreview = true }) => {
    const {
    mode, setMode,
    density, setDensity,
    
    cardStyle, setCardStyle,
    cardOpacity, setCardOpacity,
    cardBlur, setCardBlur
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
                   
                   <div className="flex justify-center py-6">
                      <div className="w-full max-w-sm pointer-events-none transform scale-90">
                         <TaskCard 
                            task={{
                                id: 999,
                                title: "Style Preview",
                                description: "This is how your tasks will appear.",
                                status: "in_progress",
                                priority: "high",
                                due_date: new Date().toISOString(),
                                assigned_to: 1
                            }}
                            onClick={() => {}}
                         />
                      </div>
                   </div>
                </div>
            )}

            <div className="space-y-8">
                
                {/* Performance Mode */}
                <div className="space-y-3">
                     <label className="text-xs font-bold text-base-content/60 uppercase tracking-wider flex items-center gap-2">
                        <span>Performance Mode</span>
                    </label>
                    <PerformanceSettings compact={true} />
                </div>

                <UnifiedThemeControls compact={true} />
                
                {/* --- CARD CUSTOMIZATION SECTION --- */}
                <div className="space-y-4 p-4 rounded-xl bg-base-content/5 border border-base-content/10">
                    <label className="text-sm font-bold text-primary uppercase flex items-center gap-2">
                        <PaintBrushIcon className="h-4 w-4" /> Card Aesthetics
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                         {['glass', 'solid', 'outline', 'neon', 'calm', 'fiery'].map((style) => (
                           <button
                             key={style}
                             onClick={() => setCardStyle(style)}
                             className={`px-2 py-2 rounded-lg border text-[10px] font-bold uppercase transition-all cursor-pointer ${
                                 cardStyle === style 
                                 ? "border-primary bg-primary/20 text-base-content shadow-[0_0_10px_rgba(var(--color-primary),0.3)]" 
                                 : "border-base-content/10 bg-base-content/5 text-base-content/60 hover:bg-base-content/10"
                             }`}
                           >
                               {style}
                           </button> 
                        ))}
                    </div>

                    {/* Card Opacity */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-base-content/60">
                            <span>Opacity</span>
                            <span>{Math.round(cardOpacity * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.1" 
                            max="1" 
                            step="0.05"
                            value={cardOpacity}
                            onChange={(e) => setCardOpacity(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    {/* Card Blur */}
                    <div className="space-y-2">
                         <div className="flex justify-between text-xs text-base-content/60">
                            <span>Blur Effect</span>
                            <span>{cardBlur}px</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="40" 
                            step="2"
                            value={cardBlur}
                            onChange={(e) => setCardBlur(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
