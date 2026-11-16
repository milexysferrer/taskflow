import { useState } from "react";
import { TaskDragOverlay } from "../TaskDragOverlay";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragCancelEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "../../types/task.types";
import { TaskColumn } from "../TaskColumn";
import { BoardContainer } from "./TaskBoard.styles";

interface TaskBoardProps {
  tasks: Task[];
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onMoveTask: (
    taskId: string,
    targetStatus: TaskStatus,
    targetIndex: number,
  ) => void;
}

const columns = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
] as const;

const statuses: TaskStatus[] = ["todo", "in-progress", "done"];

export function TaskBoard({
  tasks,
  onDelete,
  onEdit,
  onMoveTask,
}: TaskBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const movingTask = tasks.find((task) => task.id === active.id);

    if (!movingTask) return;

    const targetTask = tasks.find((task) => task.id === over.id);

    const targetStatus = targetTask
      ? targetTask.status
      : statuses.find((status) => status === over.id);

    if (!targetStatus) return;

    const targetTasks = tasks
      .filter(
        (task) => task.status === targetStatus && task.id !== movingTask.id,
      )
      .sort((a, b) => a.order - b.order);

    let targetIndex = targetTasks.length;

    if (targetTask) {
      targetIndex = targetTasks.findIndex((task) => task.id === targetTask.id);

      if (targetIndex < 0) return;

      if (
        movingTask.status === targetStatus &&
        movingTask.order < targetTask.order
      ) {
        targetIndex += 1;
      }
    }

    onMoveTask(movingTask.id, targetStatus, targetIndex);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((item) => item.id === event.active.id);

    setActiveTask(task ?? null);
  };

  const handleDragCancel = (_event: DragCancelEvent) => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <BoardContainer>
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </BoardContainer>

      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: "ease-out",
        }}
      >
        {activeTask ? (
          <div style={{ width: "280px" }}>
            <TaskDragOverlay task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
