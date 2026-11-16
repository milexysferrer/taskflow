import { Button } from "../../../../components/ui/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types/task.types";
import {
  Card,
  CardTitle,
  Description,
  CardFooter,
  PriorityBadge,
  DueDate,
} from "./TaskCard.styles";

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const formattedDate = task.dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${task.dueDate}T00:00:00Z`))
    : null;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={dragStyle}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Drag ${task.title}`}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
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
      <CardTitle>{task.title}</CardTitle>

      {task.description && <Description>{task.description}</Description>}

      <CardFooter>
        <PriorityBadge $priority={task.priority}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
          Priority
        </PriorityBadge>

        {formattedDate && <DueDate>📅 {formattedDate}</DueDate>}
      </CardFooter>
      <div style={{ display: "flex", gap: "8px" }}>
        {onEdit && (
          <Button
            variant="secondary"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
}
