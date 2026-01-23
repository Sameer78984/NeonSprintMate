import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const NeonSelect = ({
  options,
  value,
  onChange,
  label,
  icon: Icon,
  placeholder = "Select Option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside to maintain focus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="space-y-2 w-full relative" ref={containerRef}>
      {label && (
        <label className="text-xs ml-4 font-medium text-base-content/60 transition-colors">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-base-100/50 border ${
            isOpen
              ? "border-primary shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
              : "border-base-content/10"
          } rounded-2xl py-4 pl-12 pr-4 text-sm glass-panel flex items-center justify-between text-left transition-all duration-300 group`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`absolute left-4 text-base-content/60 group-hover:text-primary transition-colors ${isOpen ? "text-primary" : ""}`}
            >
              {Icon ? (
                <Icon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
            <span className={selectedOption ? "text-base-content" : "text-base-content/60"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDownIcon
            className={`h-4 w-4 text-base-content/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-[100] w-full bg-base-100 border border-base-content/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto custom-scrollbar"
            >
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all ${
                      value === option.value
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-base-content/60 hover:text-base-content hover:bg-base-content/5"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { NeonSelect };
