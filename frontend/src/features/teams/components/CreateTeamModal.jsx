import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useToastStore } from "../../../stores/useToastStore";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  XMarkIcon,
  UserGroupIcon,
  HashtagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const CreateTeamModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { createTeam, loading } = useTeamStore();
  const { addToast } = useToastStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTeam(formData);

    if (res.success) {
      addToast(`Unit "${formData.name}" Initialized.`, "cyan");
      setFormData({ name: "", description: "" });
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-deep-black border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple animate-pulse" />

              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon-purple/10 rounded-lg">
                      <UserGroupIcon className="h-6 w-6 text-neon-purple" />
                    </div>
                    <h3 className="text-lg font-black uppercase italic tracking-wider">
                      Establish Unit
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Unit Designation (Name)"
                    icon={HashtagIcon}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Omega Squad"
                    required
                  />

                  <Input
                    label="Mission Brief (Description)"
                    icon={DocumentTextIcon}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="e.g. Backend Operations"
                  />

                  <div className="pt-2 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="purple"
                      loading={loading}
                      className="flex-1"
                    >
                      Initialize
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

export default CreateTeamModal;
