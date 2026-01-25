import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../../../stores/useThemeStore";
import { TaskCard } from "../../tasks/components/TaskCard";
import { Button } from "../../../components/Button";
import { PaintBrushIcon, CheckIcon } from "@heroicons/react/24/outline";

export const WelcomeModal = () => {
  const { hasSeenWelcome, setHasSeenWelcome, setCardStyle, cardStyle } = useThemeStore();

  if (hasSeenWelcome) return null;

  // Dummy task for preview
  const dummyTask = {
    id: 1,
    title: "Welcome to NeonSprintMate",
    description: "This is a live preview of your task cards. Select a style below to customize your experience.",
    status: "in_progress",
    priority: "high",
    due_date: new Date().toISOString(),
    assigned_to: 1
  };

  const styles = [
    { id: 'glass', name: 'Glass', desc: 'Frosted & Modern' },
    { id: 'solid', name: 'Solid', desc: 'High Contrast' },
    { id: 'neon', name: 'Neon', desc: 'Glowing Borders' },
    { id: 'outline', name: 'Outline', desc: 'Clean & Minimal' },
    { id: 'calm', name: 'Calm', desc: 'Soft & Peaceful' },
    { id: 'fiery', name: 'Fiery', desc: 'Intense Energy' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
           initial={{ scale: 0.9, opacity: 0, y: 20 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           className="relative w-full max-w-4xl bg-[#09090b] border border-primary/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(var(--color-primary),0.3)] overflow-hidden"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Col: Intro & Options */}
            <div className="space-y-8">
              <div>
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30"
                 >
                    <PaintBrushIcon className="h-8 w-8 text-black" />
                 </motion.div>
                 <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                    Welcome, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple">
                       Operative.
                    </span>
                 </h1>
                 <p className="text-zinc-400 text-lg leading-relaxed">
                    Before we begin, choose a visual style for your workspace. You can change this anytime in settings.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCardStyle(s.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                         cardStyle === s.id
                         ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
                         : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                      }`}
                    >
                       <div className={`font-bold uppercase text-xs mb-1 ${cardStyle === s.id ? 'text-primary' : 'text-zinc-300'}`}>
                          {s.name}
                       </div>
                       <div className="text-[10px] text-zinc-500">
                          {s.desc}
                       </div>
                    </button>
                 ))}
              </div>

              <Button 
                variant="cyan" 
                onClick={() => setHasSeenWelcome(true)}
                className="w-full py-4 text-base font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                 Enter Dashboard <CheckIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Right Col: Live Preview */}
            <div className="flex flex-col justify-center items-center bg-black/40 rounded-3xl p-8 border border-white/5 relative">
               <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
               <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-8 relative z-10">
                  Live Preview
               </div>
               
               <div className="w-full max-w-sm relative z-10 perspective-[1000px]">
                  <TaskCard task={dummyTask} onClick={() => {}} />
                  
                  {/* Reflection/Shadow beneath */}
                  <div className="absolute -bottom-8 left-4 right-4 h-4 bg-black blur-xl opacity-80" />
               </div>

               <div className="mt-8 text-center text-zinc-600 text-xs max-w-xs relative z-10">
                  The {styles.find(s => s.id === cardStyle)?.name} style applies to all tasks, notes, and widgets across the platform.
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
