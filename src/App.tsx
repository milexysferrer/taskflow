import { useState } from "react";

import { TaskBoard } from "./features/tasks/components/TaskBoard";
import { TaskForm } from "./features/tasks/components/TaskForm";

import type { Task } from "./features/tasks/types/task.types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (newTask: Task) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        ...newTask,
        order: previousTasks.filter((task) => task.status === newTask.status)
          .length,
      },
    ]);
  };

  return (
    <main style={{ padding: "32px" }}>
      <h1>TaskFlow</h1>

      <TaskForm onSubmit={handleCreateTask} />

      <section style={{ marginTop: "40px" }}>
        <h2>My Tasks</h2>
        <TaskBoard tasks={tasks} />
      </section>
    </main>
  );
}
