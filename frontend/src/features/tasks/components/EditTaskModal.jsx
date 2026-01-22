import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskStore } from "../../../stores/useTaskStore";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useToastStore } from "../../../stores/useToastStore";
import NeonSelect from "../../../components/NeonSelect";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  XMarkIcon,
  PencilSquareIcon,
  UserIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    assigned_to: "",
  });
  const { updateTask, loading } = useTaskStore();
  const { members } = useTeamStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        assigned_to: task.assigned_to || "",
      });
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateTask(task.id, formData);
    if (res.success) {
      addToast("Objective updated successfully.", "purple");
      onClose();
    } else {
      addToast(res.error, "error");
    }
  };

  const statusOptions = [
    { label: "Todo / Queue", value: "todo" },
    { label: "In Progress / Active", value: "in_progress" },
    { label: "Completed / Terminated", value: "done" },
  ];

  const memberOptions = [
    { label: "Unassigned", value: "" },
    ...members.map((m) => ({ label: m.name, value: m.id })),
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[300]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl bg-deep-black border border-white/10 rounded-[2.5rem] shadow-2xl p-10 pointer-events-auto space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                  <PencilSquareIcon className="h-6 w-6 text-neon-purple" />{" "}
                  Edit_Objective
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-zinc-500 hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <Input
                  label="Objective Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />

                <div className="space-y-2 px-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] ml-4 font-bold font-mono text-zinc-500">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-sm glass-panel focus:border-neon-purple/50 focus:outline-none text-white min-h-[120px] resize-none transition-all"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter objective parameters..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <NeonSelect
                    label="Task Status"
                    options={statusOptions}
                    value={formData.status}
                    onChange={(val) =>
                      setFormData({ ...formData, status: val })
                    }
                    icon={ArrowPathIcon}
                  />
                  <NeonSelect
                    label="Assigned Operative"
                    options={memberOptions}
                    value={formData.assigned_to}
                    onChange={(val) =>
                      setFormData({ ...formData, assigned_to: val })
                    }
                    icon={UserIcon}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="purple"
                  loading={loading}
                  className="flex-1"
                >
                  Update Node
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditTaskModal;
