import { useState } from "react";

import { Button } from "./components/ui/Button";
import { Modal } from "./components/ui/Modal";

import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";
import { useTaskStore } from "./features/tasks/store/useTaskStore";

import type { Task } from "./features/tasks/types/task.types";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
    } else {
      addTask(task);
    }

    handleCloseModal();
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (confirmed) {
      deleteTask(id);
    }
  };

  return (
    <main style={{ padding: "32px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <h1>TaskFlow</h1>

        <Button onClick={handleOpenCreate}>+ New Task</Button>
      </header>

      <TaskBoard
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleOpenEdit}
      />

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        {isModalOpen && (
          <TaskForm
            key={editingTask?.id ?? "new"}
            task={editingTask}
            onSubmit={handleSaveTask}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </main>
  );
}
