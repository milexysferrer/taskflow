import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Task } from "../types/task.types";

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, changes: Partial<Task>) => void;
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
    }),
    {
      name: "taskflow-tasks",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    },
  ),
);
