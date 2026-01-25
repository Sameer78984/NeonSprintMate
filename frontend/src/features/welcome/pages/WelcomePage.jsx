import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SunIcon, 
  MoonIcon, 
  SparklesIcon, 
  CheckCircleIcon,
  SwatchIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  CubeIcon
} from "@heroicons/react/24/outline";
import { UnifiedThemeControls } from "../../../components/UnifiedThemeControls";
import { PerformanceSettings } from "../../settings/components/PerformanceSettings";
import { useThemeStore } from "../../../stores/useThemeStore";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { 
    // Visuals
    mode, setMode, 
    primaryColor, setPrimaryColor,
    customTextColor, setCustomTextColor,
    
    // Interface
    density, setDensity,
    cardStyle, setCardStyle,
    shadowIntensity, setShadowIntensity,
    fontFamily, setFontFamily,

    setHasSeenWelcome 
  } = useThemeStore();

  const [step, setStep] = useState(1);

  const handleFinish = () => {
    setHasSeenWelcome(true);
    navigate("/");
  };

  const steps = [
    { id: 1, name: "Visual Core", icon: <SwatchIcon className="w-5 h-5" /> },
    { id: 2, name: "Interface", icon: <ComputerDesktopIcon className="w-5 h-5" /> },
    { id: 3, name: "Immersion", icon: <SparklesIcon className="w-5 h-5" /> },
  ];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full bg-base-100/60 backdrop-blur-xl border border-base-content/10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 sm:p-8 text-center border-b border-base-content/10 bg-base-200/30 flex-shrink-0">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--p),0.5)]"
          >
            <SparklesIcon className="w-6 h-6" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-1 font-display">
            Setup Your Workspace
          </h1>
          <p className="text-base-content/70 text-sm">Customize every detail of your experience.</p>
        </div>

        {/* Wizard Steps Progress */}
        <div className="px-8 pt-6 flex flex-col items-center">
            <div className="flex items-center gap-4 text-sm font-medium text-base-content/60 mb-2">
                <span>Step {step} of 3</span>
                <span className="text-primary">{steps[step-1].name}</span>
            </div>
            <div className="w-full max-w-xs h-1 bg-base-content/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "33%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                />
            </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
          <AnimatePresence mode="wait" initial={false}>
            
            {/* --- STEP 1: VISUAL CORE --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                {/* Mode Selection */}
                <section className="space-y-4">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Theme Mode</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {['light', 'dark'].map((m) => (
                            <button 
                                key={m}
                                onClick={() => setMode(m)}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${mode === m ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--p),0.2)]" : "border-base-content/10 hover:border-primary/50"}`}
                            >
                                {m === 'light' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                                <span className="font-medium capitalize">{m} Mode</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Primary Color */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Neon Accent</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                        "#06b6d4", "#d946ef", "#f43f5e", "#84cc16", 
                        "#fbbf24", "#f97316", "#3b82f6", 
                        "#dc2626", "#10b981", "#8b5cf6", "#0ea5e9"
                        ].map((color) => (
                        <button
                            key={color}
                            onClick={() => setPrimaryColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                            primaryColor === color ? "border-base-content scale-110 shadow-lg" : "border-transparent hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                        />
                        ))}
                         <div className="relative w-10 h-10 rounded-full overflow-hidden border border-base-content/20 hover:border-base-content transition-all flex items-center justify-center group">
                            <span className="text-xs opacity-50 text-base-content/0 group-hover:text-base-content/100 transition-all font-bold">+</span>
                            <input 
                                type="color" 
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                </section>

                {/* Text Color Override */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Text Color Override</h3>
                        {customTextColor && (
                            <button onClick={() => setCustomTextColor("")} className="text-xs text-error hover:underline">Reset to Default</button>
                        )}
                    </div>
                    <div className="relative h-12 w-full bg-base-200/50 rounded-xl border border-base-content/10 flex items-center px-4 gap-4 overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="w-6 h-6 rounded-full border border-base-content/20 shadow-sm" style={{ backgroundColor: customTextColor || (mode === 'dark' ? '#ffffff' : '#000000') }} />
                        <span className="flex-1 text-sm font-mono opacity-70">{customTextColor || 'Default Theme Color'}</span>
                        <input 
                            type="color" 
                            value={customTextColor || '#ffffff'}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                         <PaintBrushIcon className="w-5 h-5 opacity-50" />
                    </div>
                </section>
              </motion.div>
            )}

            {/* --- STEP 2: INTERFACE --- */}
            {step === 2 && (
               <motion.div
                key="step2"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                  {/* Typography */}
                  <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Typography</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: "Modern Sans", value: "Inter, sans-serif" },
                            { name: "Developer Mono", value: "'Roboto Mono', monospace" },
                            { name: "Cyber Display", value: "'Orbitron', sans-serif" },
                            { name: "Classic Serif", value: "serif" }
                        ].map((font) => (
                            <button
                                key={font.name}
                                onClick={() => setFontFamily(font.value)}
                                className={`p-3 rounded-lg border text-sm text-left transition-all cursor-pointer ${
                                    fontFamily === font.value 
                                    ? "bg-primary/10 border-primary text-primary" 
                                    : "border-base-content/10 hover:bg-base-200"
                                }`}
                                style={{ fontFamily: font.value }}
                            >
                                {font.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Card Style */}
                 <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">UI Style</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                            { id: "glass", name: "Neo-Glass" },
                            { id: "solid", name: "Deep Solid" },
                            { id: "outline", name: "Neon Minimal" },
                            { id: "cyber", name: "Cyber Tech" },
                            { id: "soft", name: "Soft Glow" },
                            { id: "gradient", name: "Vibrant" }
                        ].map((style) => (
                            <button
                                key={style.id}
                                onClick={() => setCardStyle(style.id)}
                                className={`p-3 rounded-lg text-sm transition-all border cursor-pointer ${
                                    cardStyle === style.id
                                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(var(--p),0.2)]"
                                    : "border-base-content/5 bg-base-200/30 hover:bg-base-200"
                                }`}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Performance */}
                 <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Experience & Performance</h3>
                    <PerformanceSettings compact={false} />
                </section>

                {/* Density & Shadows */}
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                             <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Density</h3>
                             <span className="text-xs font-mono text-primary">{Math.round(density * 100)}%</span>
                        </div>
                        <input 
                            type="range" min="0.8" max="1.2" step="0.1"
                            value={density}
                            onChange={(e) => setDensity(parseFloat(e.target.value))}
                            className="range range-primary range-xs"
                        />
                    </div>
                     <div className="space-y-4">
                         <div className="flex justify-between">
                             <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50">Glow Intensity</h3>
                             <span className="text-xs font-mono text-primary">{shadowIntensity * 20}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="5" step="0.5"
                            value={shadowIntensity}
                            onChange={(e) => setShadowIntensity(parseFloat(e.target.value))}
                            className="range range-secondary range-xs"
                        />
                    </div>
                </div>

              </motion.div>
            )}

            {/* --- STEP 3: IMMERSION --- */}
            {step === 3 && (
               <motion.div
                key="step3"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                 <UnifiedThemeControls />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 sm:p-8 pt-4 border-t border-base-content/10 bg-base-200/30 flex justify-between items-center flex-shrink-0">
          <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className={`btn btn-ghost gap-2 ${step === 1 ? "invisible" : ""}`}
          >
              Back
          </button>
        
          <button 
              onClick={() => step < 3 ? setStep(s => s + 1) : handleFinish()}
              className="btn btn-primary px-8 shadow-[0_0_20px_rgba(var(--p),0.4)] hover:shadow-[0_0_30px_rgba(var(--p),0.6)]"
          >
              {step === 3 ? "Complete Setup" : "Next Step"}
          </button>
        </div>

      </div>
    </div>
  );
};
