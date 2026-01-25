import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import { TaskCard } from "./TaskCard";
import { TaskSkeleton } from "./TaskSkeleton";

/**
 * TaskKanban Component
 *
 * Displays tasks in a Kanban board layout with drag-and-drop functionality.
 *
 * @param {Object} props
 * @param {Array} props.tasks - All tasks to display
 * @param {Function} props.onTaskClick - Handler when a task is clicked
 * @param {Function} props.onDragEnd - Handler when a task is dropped (updates status)
 */
export const TaskKanban = ({ tasks, loading, onTaskClick, onDragEnd }) => {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group tasks by status
  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };


  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={(event) => {
        setActiveTask(null);
        onDragEnd(event);
      }}
      // [FIX] Add measuring configuration to help with fast movements
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      {/* Responsive Container: Stack on mobile, Horizontal Scroll on tablet, Grid on Desktop */}
      <div className="kanban-scroll-container flex flex-col md:flex-row md:overflow-x-auto lg:grid lg:grid-cols-3 gap-4 md:gap-6 h-full pb-4 md:pb-2 snap-x snap-mandatory scroll-smooth px-1">
        <div className="flex-shrink-0 w-full md:w-[300px] md:min-w-[260px] lg:w-auto snap-center lg:snap-align-none">
            <TaskColumn
            id="todo"
            title="Queue / Todo"
            tasks={columns.todo}
            onTaskClick={onTaskClick}
            />
        </div>
        <div className="flex-shrink-0 w-full md:w-[300px] md:min-w-[260px] lg:w-auto snap-center lg:snap-align-none">
            <TaskColumn
            id="in_progress"
            title="In Progress"
            tasks={columns.in_progress}
            onTaskClick={onTaskClick}
            />
        </div>
        <div className="flex-shrink-0 w-full md:w-[300px] md:min-w-[260px] lg:w-auto snap-center lg:snap-align-none">
            <TaskColumn
            id="done"
            title="Completed"
            tasks={columns.done}
            onTaskClick={onTaskClick}
            />
        </div>
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};
