import { useState } from "react";
import { Modal, ModalHeader } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTeamStore } from "../../../stores/useTeamStore";
import { useToastStore } from "../../../stores/useToastStore";
import {
  UserGroupIcon,
  HashtagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/**
 * CreateTeamModal Component
 * 
 * Modal for creating a new team with name and description.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @returns {JSX.Element} Create team modal component
 */
export const CreateTeamModal = ({ isOpen, onClose }) => {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      zIndex={200}
      accentColor="mixed"
    >
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Unit Designation (Name)"
            icon={HashtagIcon}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
    </Modal>
  );
};
