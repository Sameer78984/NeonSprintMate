import { useThemeStore } from "../../../stores/useThemeStore";
import { SwatchIcon, ComputerDesktopIcon, SparklesIcon } from "@heroicons/react/24/outline";

export const SettingsPage = () => {
  const { 
    density, setDensity, 
    primaryColor, setPrimaryColor, 
    cardStyle, setCardStyle,
    shadowIntensity, setShadowIntensity,
    fontFamily, setFontFamily,
    customTextColor, setCustomTextColor,
    textShadow, setTextShadow, textShadowColor, setTextShadowColor,
    showPomodoro, showStats, showNotes, toggleFeature,
    bgStyle, setBgStyle, bgAnimationSpeed, setBgAnimationSpeed, enableParticles, setEnableParticles,
    rainSpeed, setRainSpeed, rainAmount, setRainAmount,
    snowSpeed, setSnowSpeed, snowAmount, setSnowAmount
  } = useThemeStore();

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-20">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-base-content/60 mb-2">
          Settings
        </h1>
        <p className="text-zinc-500 font-light">
          Customize your workspace appearance and preferences.
        </p>
      </header>

      {/* Visual Customization */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
          <SwatchIcon className="h-6 w-6 text-neon-cyan" />
          <h2 className="text-xl font-bold uppercase tracking-widest">Visual Style</h2>
        </div>
        
        {/* Colors & Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Neon Accent & Palette</label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[10px] font-mono text-zinc-500 group-hover:text-primary transition-colors">CUSTOM PICKER</span>
                        <input 
                            type="checkbox" 
                            className="toggle toggle-xs toggle-primary" 
                            checked={!!customTextColor} // Using this as a proxy for "custom mode" visually or just separate logic
                            onChange={(e) => {
                                if (!e.target.checked) setPrimaryColor('#06b6d4'); // Reset or keep current
                            }}
                        />
                    </label>
                </div>

                {/* Expanded Color Grid */}
                <div className="grid grid-cols-6 gap-3">
                     {[
                       "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef",
                       "#f43f5e", "#e11d48", "#f97316", "#f59e0b", "#eab308", "#84cc16",
                       "#10b981", "#14b8a6", "#34d399", "#a78bfa", "#ec4899", "#fb7185",
                       "#fdba74", "#fcd34d", "#bef264", "#6ee7b7", "#93c5fd", "#c4b5fd" 
                     ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryColor(color)}
                          className={`w-full aspect-square rounded-lg border transition-all cursor-pointer ${
                            primaryColor === color ? "border-white scale-110 shadow-lg ring-2 ring-white/20" : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                     ))}
                </div>
                
                {/* Custom Color Block */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                    <div className="flex justify-between text-xs text-zinc-400">
                        <span>Precise Hex Input</span>
                        <span className="font-mono text-primary">{primaryColor}</span>
                    </div>
                    <div className="h-12 w-full rounded-lg overflow-hidden relative border border-white/10">
                         <input 
                            type="color" 
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                        />
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center font-bold text-shadow-sm text-white/50" style={{ backgroundColor: primaryColor }}>
                            CLICK TO EDIT
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Typography & Fonts</label>
                
                {/* Font Cloud */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { name: "Inter", value: "Inter, sans-serif" },
                        { name: "Roboto", value: "'Roboto', sans-serif" },
                        { name: "Mono", value: "'Roboto Mono', monospace" },
                        { name: "Orbitron", value: "'Orbitron', sans-serif" },
                        { name: "Serif", value: "serif" },
                        { name: "Poppins", value: "'Poppins', sans-serif" },
                        { name: "Montserrat", value: "'Montserrat', sans-serif" },
                        { name: "Lato", value: "'Lato', sans-serif" },
                        { name: "Oswald", value: "'Oswald', sans-serif" },
                        { name: "Raleway", value: "'Raleway', sans-serif" },
                        { name: "Playfair", value: "'Playfair Display', serif" },
                    ].map((font) => (
                        <button
                            key={font.name}
                            onClick={() => setFontFamily(font.value)}
                            className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                                fontFamily === font.value 
                                ? "bg-primary/20 border-primary text-primary" 
                                : "border-base-content/10 hover:bg-base-content/5 text-base-content/70"
                            }`}
                            style={{ fontFamily: font.value }}
                        >
                            {font.name}
                        </button>
                    ))}
                </div>

                {/* Custom Google Font Loader */}
                <div className="p-4 rounded-xl bg-deep-black border border-white/10 space-y-4 shadow-inner">
                    <label className="block text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                        Custom Google Font
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="e.g. Pacifico" // User requested "Legit" input
                            className="flex-1 bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:border-primary focus:outline-none transition-colors font-mono"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setFontFamily(`'${e.target.value}', sans-serif`);
                                }
                            }}
                        />
                        <button className="text-[10px] font-bold bg-white/5 hover:bg-white/10 px-3 rounded border border-white/10 uppercase cursor-pointer">
                            Load
                        </button>
                    </div>
                    <p className="text-[9px] text-zinc-600 leading-relaxed">
                        Type the exact name of any font from <a href="https://fonts.google.com" target="_blank" className="text-primary underline">fonts.google.com</a> and press Enter. The system will auto-inject the stylesheet.
                    </p>
                </div>
            </div>
        </div>

        {/* Card Styling */}
        <div className="space-y-4">
           <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Card & Input Style</label>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                  { id: "glass", name: "Neo-Glass", desc: "Translucent layers with blur" },
                  { id: "solid", name: "Deep Solid", desc: "Opaque dark/light blocks" },
                  { id: "outline", name: "Neon Minimal", desc: "Clean borders, no background" },
                  { id: "cyber", name: "Cyber Tech", desc: "Digital noise & sharp borders" },
                  { id: "soft", name: "Soft Glow", desc: "Rounded & diffused light" },
                  { id: "gradient", name: "Vibrant Gradient", desc: "Rich background gradients" }
              ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setCardStyle(style.id)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                        cardStyle === style.id
                          ? "bg-primary/10 border-primary"
                          : "border-base-content/5 hover:bg-base-content/5"
                    }`}
                  >
                     <span className={`block font-bold uppercase text-sm mb-1 ${cardStyle === style.id ? "text-primary" : "text-base-content"}`}>
                        {style.name}
                     </span>
                     <span className="text-xs text-zinc-500">{style.desc}</span>
                  </button>
              ))}
           </div>
        </div>
      </section>

      {/* Interface Density / Size */}
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
      </section>

      <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm">
        <strong className="block mb-2 text-orange-400 uppercase tracking-widest text-xs">Note</strong>
        Changing density scales the entire application interface. Some layouts may require a refresh to recalculate correctly.
      </div>
      
       {/* Immersive Background */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
          <SparklesIcon className="h-6 w-6 text-neon-green" />
          <h2 className="text-xl font-bold uppercase tracking-widest">Live Background</h2>
        </div>
        
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {['grid', 'aurora', 'nebula', 'cyber_rain', 'fireflies', 'matrix', 'minimal'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setBgStyle(style)}
                    className={`p-4 rounded-xl border capitalize transition-all ${
                        bgStyle === style 
                        ? "bg-neon-green/10 border-neon-green text-neon-green shadow-[0_0_15px_var(--color-neon-green)]" 
                        : "border-white/5 hover:bg-white/5"
                    }`}
                  >
                     {style.replace("_", " ")}
                  </button>
               ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Animation Speed</label>
                        <span className="text-xs font-mono text-neon-green">{bgAnimationSpeed}x</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.1" 
                        max="5" 
                        step="0.1"
                        value={bgAnimationSpeed}
                        onChange={(e) => setBgAnimationSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-green"
                    />
                 </div>
                 
                 <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                    <div>
                        <span className="block font-bold text-white mb-1">Interactive Particles</span>
                        <span className="text-xs text-zinc-500">Floating dust that reacts to theme color</span>
                    </div>
                    <button 
                        onClick={() => setEnableParticles(!enableParticles)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${enableParticles ? 'bg-neon-green' : 'bg-zinc-700'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${enableParticles ? 'left-7' : 'left-1'}`} />
                    </button>
                 </div>
            </div>

            {/* Rain Controls */}
            {bgStyle === 'cyber_rain' && (
                <div className="p-6 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 space-y-6">
                    <h3 className="text-sm font-bold text-neon-cyan uppercase tracking-wider">Rain Configuration</h3>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Speed Multiplier</span>
                            <span className="text-neon-cyan font-mono">x{rainSpeed}</span>
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
                            <span>Density</span>
                            <span className="text-neon-cyan font-mono">{rainAmount} drops</span>
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
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Snow Configuration</h3>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Speed Multiplier</span>
                            <span className="text-white font-mono">x{snowSpeed}</span>
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
                            <span>Flurries</span>
                            <span className="text-white font-mono">{snowAmount} flakes</span>
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
        </div>
      </section>

    </div>
  );
};
