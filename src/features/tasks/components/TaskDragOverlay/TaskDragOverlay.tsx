import type { Task } from "../../types/task.types";

import { TaskCardContent } from "../TaskCard/TaskCardContent";
import { Card } from "../TaskCard/TaskCard.styles";

interface TaskDragOverlayProps {
  task: Task;
}

export function TaskDragOverlay({ task }: TaskDragOverlayProps) {
  return (
    <Card
      style={{
        cursor: "grabbing",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.2)",
        borderColor: "#6366F1",
        transform: "rotate(2deg)",
      }}
    >
      <TaskCardContent task={task} />
    </Card>
  );
}
