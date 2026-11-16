import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Task } from "../types/task.types";

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, changes: Partial<Task>) => void;
  moveTask: (
    taskId: string,
    targetStatus: Task["status"],
    targetIndex: number,
  ) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => {
          const order = state.tasks.filter(
            (item) => item.status === task.status,
          ).length;

          return {
            tasks: [...state.tasks, { ...task, order }],
          };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      updateTask: (id, changes) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...changes,
                  id: task.id,
                  createdAt: task.createdAt,
                  updatedAt: new Date().toISOString(),
                }
              : task,
          ),
        })),

      moveTask: (taskId, targetStatus, targetIndex) =>
        set((state) => {
          const movingTask = state.tasks.find((task) => task.id === taskId);

          if (!movingTask) return state;

          const otherTasks = state.tasks.filter((task) => task.id !== taskId);

          const targetTasks = otherTasks
            .filter((task) => task.status === targetStatus)
            .sort((a, b) => a.order - b.order);

          const insertIndex = Math.max(
            0,
            Math.min(targetIndex, targetTasks.length),
          );

          targetTasks.splice(insertIndex, 0, {
            ...movingTask,
            status: targetStatus,
            updatedAt: new Date().toISOString(),
          });

          const updatedTargetTasks = targetTasks.map((task, index) => ({
            ...task,
            order: index,
          }));

          const sourceTasks =
            movingTask.status !== targetStatus
              ? otherTasks
                  .filter((task) => task.status === movingTask.status)
                  .sort((a, b) => a.order - b.order)
                  .map((task, index) => ({
                    ...task,
                    order: index,
                  }))
              : [];

          const updatedTasks = new Map(
            [...updatedTargetTasks, ...sourceTasks].map((task) => [
              task.id,
              task,
            ]),
          );

          return {
            tasks: otherTasks
              .filter((task) => !updatedTasks.has(task.id))
              .concat([...updatedTasks.values()]),
          };
        }),
    }),
    {
      name: "taskflow-tasks",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
