import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export const PomodoroWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus"); // 'focus' | 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound?
      new Audio("/notification.mp3").play().catch(() => {}); 
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const switchMode = () => {
    const newMode = mode === "focus" ? "break" : "focus";
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg uppercase tracking-widest text-white">Focus Timer</h3>
        <button onClick={switchMode} className="text-xs text-neon-cyan border border-neon-cyan px-2 py-1 rounded hover:bg-neon-cyan/10">
          Switch to {mode === "focus" ? "Break" : "Focus"}
        </button>
      </div>
      
      <div className="text-5xl font-black text-center font-mono py-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex justify-center gap-4">
        <button 
          onClick={toggleTimer} 
          className="h-12 w-12 rounded-full bg-neon-cyan text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_var(--color-neon-cyan)]"
        >
          {isActive ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        </button>
        <button 
          onClick={resetTimer} 
          className="h-12 w-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
