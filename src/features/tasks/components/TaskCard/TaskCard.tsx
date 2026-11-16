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
}

export function TaskCard({ task }: TaskCardProps) {
  const formattedDate = task.dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${task.dueDate}T00:00:00Z`))
    : null;

  return (
    <Card>
      <CardTitle>{task.title}</CardTitle>

      {task.description && <Description>{task.description}</Description>}

      <CardFooter>
        <PriorityBadge $priority={task.priority}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
          Priority
        </PriorityBadge>

        {formattedDate && <DueDate>📅 {formattedDate}</DueDate>}
      </CardFooter>
    </Card>
  );
}
