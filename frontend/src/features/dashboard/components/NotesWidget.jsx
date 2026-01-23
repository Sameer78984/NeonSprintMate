import { useState, useEffect } from "react";

export const NotesWidget = () => {
  const [note, setNote] = useState(() => localStorage.getItem("sprintmate_notes") || "");
  
  const handleChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem("sprintmate_notes", e.target.value);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
       <h3 className="font-bold text-lg uppercase tracking-widest text-white mb-4">Quick Notes</h3>
       <textarea
          value={note}
          onChange={handleChange}
          className="flex-1 w-full bg-transparent border-0 focus:ring-0 text-sm text-zinc-300 resize-none placeholder-zinc-600"
          placeholder="Type your ideas here..."
       />
    </div>
  );
};
