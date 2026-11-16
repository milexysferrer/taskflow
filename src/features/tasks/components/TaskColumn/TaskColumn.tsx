import type { Task, TaskStatus } from "../../types/task.types";

import { TaskCard } from "../TaskCard";

import {
  Column,
  ColumnHeader,
  ColumnTitle,
  TaskCount,
  TaskList,
  EmptyMessage,
} from "./TaskColumn.styles";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDelete?: (id: string) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onDelete,
}: TaskColumnProps) {
  const columnTasks = tasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

  return (
    <Column aria-label={`${title} tasks`}>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <TaskCount>{columnTasks.length}</TaskCount>
      </ColumnHeader>

      <TaskList>
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))
        ) : (
          <EmptyMessage>No tasks yet</EmptyMessage>
        )}
      </TaskList>
    </Column>
  );
}
