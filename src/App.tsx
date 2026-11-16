import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";
import { useTaskStore } from "./features/tasks/store/useTaskStore";

export default function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

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
      <h1>TaskFlow</h1>

      <TaskForm onSubmit={addTask} />

      <section style={{ marginTop: "40px" }}>
        <h2>My Tasks</h2>

        <TaskBoard tasks={tasks} onDelete={handleDeleteTask} />
      </section>
    </main>
  );
}
