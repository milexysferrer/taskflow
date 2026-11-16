import { useState } from "react";

import { Button } from "./components/ui/Button";
import { Modal } from "./components/ui/Modal";
import { ConfirmDialog } from "./components/ui/ConfirmDialog";

import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";
import { useTaskStore } from "./features/tasks/store/useTaskStore";

import type { Task } from "./features/tasks/types/task.types";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
    } else {
      addTask(task);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    deleteTask(taskToDelete.id);
    setTaskToDelete(null);
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
        onEdit={handleOpenEdit}
        onDelete={(id) => {
          const task = tasks.find((item) => item.id === id);

          if (task) {
            setTaskToDelete(task);
          }
        }}
        onMoveTask={moveTask}
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
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setTaskToDelete(null);
          }
        }}
        title="Delete task?"
        description={
          taskToDelete
            ? `Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Task"
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
