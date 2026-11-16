import type { Task } from "../../types/task.types";
import { TaskColumn } from "../TaskColumn";
import { BoardContainer } from "./TaskBoard.styles";

interface TaskBoardProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
}

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
] as const;

export function TaskBoard({ tasks, onDelete }: TaskBoardProps) {
  return (
    <BoardContainer>
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks}
          onDelete={onDelete}
        />
      ))}
    </BoardContainer>
  );
}
