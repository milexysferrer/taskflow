import { useState } from "react";

import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";
import { useTaskStore } from "./features/tasks/store/useTaskStore";

import type { Task } from "./features/tasks/types/task.types";

export default function App() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (confirmed) {
      deleteTask(id);

      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    }
  };

  return (
    <main style={{ padding: "32px" }}>
      <h1>TaskFlow</h1>

      <TaskForm
        task={editingTask}
        onSubmit={handleSaveTask}
        onCancel={() => setEditingTask(null)}
      />

      <section style={{ marginTop: "40px" }}>
        <h2>My Tasks</h2>

        <TaskBoard
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
        />
      </section>
    </main>
  );
}
