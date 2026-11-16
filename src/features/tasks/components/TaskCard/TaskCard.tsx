import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Task } from "../../types/task.types";

import { Button } from "../../../../components/ui/Button";
import { TaskCardContent } from "./TaskCardContent";
import { Card } from "./TaskCard.styles";

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
      }}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Drag ${task.title}`}
        style={{
          cursor: "grab",
          border: "none",
          background: "transparent",
          color: "#64748B",
          padding: "4px",
          touchAction: "none",
          alignSelf: "flex-start",
        }}
      >
        ⠿ Drag
      </button>

      <TaskCardContent task={task} />

      <div style={{ display: "flex", gap: "8px" }}>
        {onEdit && (
          <Button variant="secondary" onClick={() => onEdit(task)}>
            Edit
          </Button>
        )}

        {onDelete && (
          <Button variant="danger" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}
