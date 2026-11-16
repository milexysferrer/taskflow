import type { Task } from "../../types/task.types";
import { TaskColumn } from "../TaskColumn";
import { BoardContainer } from "./TaskBoard.styles";

interface TaskBoardProps {
  tasks: Task[];
}

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
] as const;

export function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <BoardContainer>
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks}
        />
      ))}
    </BoardContainer>
  );
}
