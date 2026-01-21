import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore"; // Import to get members
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { XMarkIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

const CreateTaskModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    assigned_to: "", // New field
  });

  const { addTask, loading } = useTaskStore();
  const { members, fetchMembers, currentTeam } = useTeamStore();
  const { addToast } = useToastStore();

  // Load members whenever the modal opens to ensure the list is fresh
  useEffect(() => {
    if (isOpen && currentTeam) {
      fetchMembers();
    }
  }, [isOpen, currentTeam, fetchMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addTask(formData);

    if (res.success) {
      addToast("Task assigned and deployed.", "cyan");
      setFormData({
        title: "",
        description: "",
        status: "todo",
        assigned_to: "",
      });
      onClose();
    } else {
      addToast(res.error, "error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-deep-black border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan animate-pulse" />

              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black uppercase italic tracking-wider flex items-center gap-3">
                    <SparklesIcon className="h-6 w-6 text-neon-cyan" />{" "}
                    Initialize Task
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Objective Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />

                  {/* Assign Member Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] ml-4 font-bold font-mono text-zinc-500">
                      Assign Operative
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-neon-cyan transition-colors">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <select
                        value={formData.assigned_to}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assigned_to: e.target.value,
                          })
                        }
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm glass-panel focus:border-neon-cyan/50 focus:outline-none appearance-none text-white"
                      >
                        <option value="">Unassigned</option>
                        {members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Abort
                    </Button>
                    <Button
                      type="submit"
                      variant="cyan"
                      loading={loading}
                      className="flex-1"
                    >
                      Deploy Task
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;
