import { TaskBoard } from "./features/tasks/components/TaskBoard";
import type { Task } from "./features/tasks/types/task.types";

const now = new Date().toISOString();

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design dashboard layout",
    description: "Create the main dashboard interface.",
    status: "todo",
    priority: "high",
    dueDate: "2026-12-02",
    createdAt: now,
    updatedAt: now,
    order: 0,
  },
  {
    id: "2",
    title: "Define reusable components",
    description: "Document the UI component structure.",
    status: "todo",
    priority: "low",
    dueDate: "2026-12-04",
    createdAt: now,
    updatedAt: now,
    order: 1,
  },
  {
    id: "3",
    title: "Build task cards",
    description: "Implement the TaskCard component.",
    status: "in-progress",
    priority: "medium",
    dueDate: null,
    createdAt: now,
    updatedAt: now,
    order: 0,
  },
  {
    id: "4",
    title: "Set up React project",
    description: "Configure Vite and TypeScript.",
    status: "done",
    priority: "high",
    dueDate: null,
    createdAt: now,
    updatedAt: now,
    order: 0,
  },
];

export default function App() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>My Tasks</h1>
      <TaskBoard tasks={mockTasks} />
    </main>
  );
}
