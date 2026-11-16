import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
  onEdit?: (task: Task) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
}: TaskColumnProps) {
  const columnTasks = tasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <Column
      ref={setNodeRef}
      aria-label={`${title} tasks`}
      style={{
        outline: isOver ? "2px solid #6366F1" : "none",
        outlineOffset: "-2px",
      }}
    >
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <TaskCount>{columnTasks.length}</TaskCount>
      </ColumnHeader>

      <SortableContext
        items={columnTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <TaskList>
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          ) : (
            <EmptyMessage>No tasks yet</EmptyMessage>
          )}
        </TaskList>
      </SortableContext>
    </Column>
  );
}
