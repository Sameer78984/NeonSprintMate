import { SwatchIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";

export const VisualSettings = () => {
    const { 
        primaryColor, setPrimaryColor, 
        fontFamily, setFontFamily,
        customTextColor, 
        enableGlobalNeon, setEnableGlobalNeon,
        globalNeonColor, setGlobalNeonColor,
        siteStyle, setSiteStyle
    } = useThemeStore();

    return (
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
                                checked={!!customTextColor} 
                                onChange={(e) => {
                                    if (!e.target.checked) setPrimaryColor('#06b6d4'); 
                                }}
                            />
                        </label>
                    </div>

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

                    <div className="p-4 rounded-xl bg-deep-black border border-white/10 space-y-4 shadow-inner">
                        <label className="block text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                            Custom Google Font
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="e.g. Pacifico" 
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

            {/* Global Site Theme */}
            <div className="space-y-6 border-t border-white/10 pt-8">
                 <div className="flex items-center gap-3 text-white">
                    <ComputerDesktopIcon className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold uppercase tracking-widest">Global Site Theme</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                         <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Navigation & Layout Style</label>
                         <div className="grid grid-cols-3 gap-2">
                             {['glass', 'solid', 'minimal'].map((style) => (
                                 <button
                                     key={style}
                                     onClick={() => setSiteStyle(style)}
                                     className={`p-3 rounded-lg border text-xs font-bold uppercase transition-all ${
                                         siteStyle === style
                                         ? "bg-white/10 border-white text-white"
                                         : "border-white/5 text-zinc-500 hover:bg-white/5"
                                     }`}
                                 >
                                     {style}
                                 </button>
                             ))}
                         </div>
                     </div>

                     <div className="bg-neon-lime/5 border border-neon-lime/20 p-6 rounded-xl space-y-4">
                         <div className="flex justify-between items-center">
                             <div>
                                 <h3 className="text-neon-lime font-bold uppercase text-sm">Global Neon Mode</h3>
                                 <p className="text-[10px] text-zinc-400">Force neon borders on everything.</p>
                             </div>
                             <input 
                                 type="checkbox"
                                 checked={enableGlobalNeon}
                                 onChange={(e) => setEnableGlobalNeon(e.target.checked)}
                                 className="toggle toggle-accent"
                             />
                         </div>
                         
                         {enableGlobalNeon && (
                             <div className="space-y-2">
                                 <label className="text-[10px] uppercase font-bold text-zinc-500">Neon Border Color</label>
                                 <div className="flex gap-2">
                                     <input 
                                         type="color" 
                                         value={globalNeonColor || primaryColor}
                                         onChange={(e) => setGlobalNeonColor(e.target.value)}
                                         className="h-8 w-12 bg-transparent border border-white/20 rounded cursor-pointer"
                                     />
                                     <span className="text-xs text-zinc-400 self-center font-mono">
                                         {globalNeonColor || "Auto (Primary)"}
                                     </span>
                                 </div>
                             </div>
                         )}
                     </div>
                 </div>
            </div>
        </section>
    );
};
