import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../../../stores/useThemeStore";
import { TaskCard } from "../../tasks/components/TaskCard";

export const CardSettings = () => {
    const { 
        cardStyle, setCardStyle,
        cardOpacity, setCardOpacity,
        cardBlur, setCardBlur,
        primaryColor
    } = useThemeStore();

    return (
        <section className="space-y-6">
           <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
              <PaintBrushIcon className="h-6 w-6 text-neon-purple" />
              <h2 className="text-xl font-bold uppercase tracking-widest">Card Appearance</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Left Column: Controls */}
              <div className="space-y-8">
                  {/* Style Grid */}
                  <div className="space-y-4">
                      <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Style Presets</label>
                      <div className="grid grid-cols-2 gap-3">
                          {[
                              { id: "glass", name: "Neo-Glass", desc: "Translucent layers" },
                              { id: "solid", name: "Deep Solid", desc: "Opaque blocks" },
                              { id: "outline", name: "Neon Minimal", desc: "Clean borders" },
                              { id: "neon", name: "Cyber Neon", desc: "Glowing borders" },
                              { id: "calm", name: "Calm Flow", desc: "Soft teal tint" },
                              { id: "fiery", name: "Fiery Energy", desc: "Aggressive orange" }
                          ].map((style) => (
                              <button
                                key={style.id}
                                onClick={() => setCardStyle(style.id)}
                                className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                                    cardStyle === style.id
                                      ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
                                      : "border-base-content/5 hover:bg-base-content/5 hover:border-base-content/10"
                                }`}
                              >
                                 <div className={`font-bold uppercase text-xs mb-1 ${cardStyle === style.id ? "text-primary" : "text-base-content"}`}>
                                    {style.name}
                                 </div>
                                 <div className="text-[10px] text-zinc-500">{style.desc}</div>
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                      {/* Opacity Slider */}
                      <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                              <span>Card Opacity</span>
                              <span className="text-primary">{Math.round(cardOpacity * 100)}%</span>
                          </div>
                          <input 
                              type="range" 
                              min="0.1" 
                              max="1" 
                              step="0.05"
                              value={cardOpacity}
                              onChange={(e) => setCardOpacity(parseFloat(e.target.value))}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-neon-cyan"
                          />
                      </div>

                      {/* Blur Slider */}
                      <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                              <span>Blur Intensity</span>
                              <span className="text-primary">{cardBlur}px</span>
                          </div>
                          <input 
                              type="range" 
                              min="0" 
                              max="40" 
                              step="2"
                              value={cardBlur}
                              onChange={(e) => setCardBlur(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-neon-cyan"
                          />
                      </div>
                  </div>
              </div>

              {/* Right Column: Live Preview */}
              <div className="lg:sticky lg:top-24">
                  <div className="p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
                      <div className="bg-zinc-900/80 rounded-[1.4rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                          {/* Checkerboard/Grid Background for Transparency */}
                          <div className="absolute inset-0 opacity-20" 
                               style={{ 
                                   backgroundImage: `linear-gradient(45deg, #3f3f46 25%, transparent 25%), linear-gradient(-45deg, #3f3f46 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3f3f46 75%), linear-gradient(-45deg, transparent 75%, #3f3f46 75%)`,
                                   backgroundSize: '20px 20px',
                                   backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                               }} 
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
                          
                          <div className="relative z-10 mb-8 text-center">
                              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest mb-2 shadow-[0_0_10px_rgba(var(--color-primary),0.2)]">
                                  Live Preview
                              </span>
                              <p className="text-zinc-400 text-xs font-medium">
                                  Visual confirmation of card aesthetics.
                              </p>
                          </div>

                          <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.02] perspective-[1000px]">
                              <TaskCard 
                                  task={{
                                      id: 999,
                                      title: "Frontend Refactor",
                                      description: "Implement the new design system components and verify mobile responsiveness across all devices.",
                                      status: "in_progress",
                                      priority: "high",
                                      due_date: new Date(Date.now() + 86400000).toISOString(),
                                      assigned_to: 1
                                  }}
                                  onClick={() => {}}
                              />
                               {/* Reflection/Shadow beneath */}
                              <div className="absolute -bottom-6 left-4 right-4 h-4 bg-primary blur-2xl opacity-20" />
                          </div>

                      </div>
                  </div>
              </div>

           </div>
        </section>
    );
};
