import { Modal, ModalHeader } from "../../../components/Modal";
import { NeonSelect } from "../../../components/NeonSelect";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTaskForm } from "../hooks/useTaskForm";
import { mapMembersToOptions } from "../utils/constants";
import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";

/**
 * CreateTaskModal Component
 * 
 * Modal for creating a new task with title and assignment options.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @returns {JSX.Element} Create task modal component
 */
export const CreateTaskModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    title: "",
    description: "",
    status: "todo",
    assigned_to: "",
  };

  const { formData, setFormData, handleSubmit, loading, members } =
    useTaskForm(initialFormData, isOpen, onClose);

  const memberOptions = mapMembersToOptions(
    members,
    true,
    "Unassigned / AI Controlled"
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      zIndex={200}
      accentColor="mixed"
    >
      <div className="p-10">
        <ModalHeader
          icon={SparklesIcon}
          title="Create Task"
          onClose={onClose}
          color="cyan"
        />

        <form onSubmit={(e) => handleSubmit(e, null)} className="space-y-8">
          <Input
            label="Task Title"
            placeholder="Enter task title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <NeonSelect
            label="Assign Member"
            placeholder="Assign to..."
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
              Cancel
            </Button>
            <Button
              type="submit"
              variant="cyan"
              loading={loading}
              className="flex-1 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
