import { useEffect } from "react";
import { Modal, ModalHeader } from "../../../components/Modal";
import { NeonSelect } from "../../../components/NeonSelect";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useTaskForm } from "../hooks/useTaskForm";
import {
  TASK_STATUS_FORM_OPTIONS,
  mapMembersToOptions,
} from "../utils/constants";
import {
  PencilSquareIcon,
  UserIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

/**
 * EditTaskModal Component
 * 
 * Modal for editing an existing task with all task fields.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.task - Task object to edit
 * @returns {JSX.Element} Edit task modal component
 */
export const EditTaskModal = ({ isOpen, onClose, task }) => {
  const initialFormData = {
    title: "",
    description: "",
    status: "todo",
    assigned_to: "",
    due_date: "",
  };

  const { formData, setFormData, handleSubmit, loading, members } =
    useTaskForm(initialFormData, isOpen, onClose);

  // Populate form when task changes
  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        assigned_to: task.assigned_to || "",
        due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : "",
      });
    }
  }, [task, isOpen, setFormData]);

  const memberOptions = mapMembersToOptions(members, true, "Unassigned");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      zIndex={300}
      accentColor="purple"
    >
      <form
        onSubmit={(e) => handleSubmit(e, task?.id)}
        className="p-10 space-y-8"
      >
        <ModalHeader
          icon={PencilSquareIcon}
          title="Edit Task"
          onClose={onClose}
          color="purple"
        />

        <div className="space-y-6">
          <Input
            label="Task Title"
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
              placeholder="Enter task description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeonSelect
              label="Task Status"
              options={TASK_STATUS_FORM_OPTIONS}
              value={formData.status}
              onChange={(val) =>
                setFormData({ ...formData, status: val })
              }
              icon={ArrowPathIcon}
            />
            <NeonSelect
              label="Assign Member"
              options={memberOptions}
              value={formData.assigned_to}
              onChange={(val) =>
                setFormData({ ...formData, assigned_to: val })
              }
              icon={UserIcon}
            />
            <div className="md:col-span-2">
                 <Input
                    type="date"
                    label="Due Date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                 />
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
