
import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";

import { useTaskStore } from "./features/tasks/store/useTaskStore";

export default function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  return (
    <main style={{ padding: "32px" }}>
      <h1>TaskFlow</h1>

      <TaskForm onSubmit={addTask} />

      <section style={{ marginTop: "40px" }}>
        <h2>My Tasks</h2>
        <TaskBoard tasks={tasks} />
      </section>
    </main>
  );
}
