import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useToastStore } from "../../../stores/useToastStore";
import NeonSelect from "../../../components/NeonSelect"; // Custom neon dropdown
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { XMarkIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

const CreateTaskModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    assigned_to: "",
  });

  const { addTask, loading } = useTaskStore();
  const { members, fetchMembers, currentTeam } = useTeamStore();
  const { addToast } = useToastStore();

  // Sync member list whenever the modal opens to ensure accuracy
  useEffect(() => {
    if (isOpen && currentTeam) {
      fetchMembers();
    }
  }, [isOpen, currentTeam, fetchMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addTask(formData);

    if (res.success) {
      addToast("Objective deployed to the matrix.", "cyan");
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

  // Map team members to NeonSelect format
  const memberOptions = [
    { label: "Unassigned / AI Controlled", value: "" },
    ...members.map((member) => ({
      label: `${member.name} (${member.email})`,
      value: member.id,
    })),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-deep-black border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto relative">
              {/* Neon Top Accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan animate-pulse" />

              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                    <SparklesIcon className="h-6 w-6 text-neon-cyan" />{" "}
                    Initialize_Task
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-zinc-600 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <Input
                    label="Objective Title"
                    placeholder="Enter node identifier..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />

                  {/* REPLACED: Native dropdown with NeonSelect */}
                  <NeonSelect
                    label="Assign Operative"
                    placeholder="Link Operative to Node"
                    options={memberOptions}
                    value={formData.assigned_to}
                    onChange={(val) =>
                      setFormData({ ...formData, assigned_to: val })
                    }
                    icon={UserIcon}
                  />

                  <div className="pt-6 flex gap-4">
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
                      className="flex-1 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
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
