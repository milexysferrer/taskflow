import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../../types/task.types";
import { taskSchema, type TaskFormValues } from "../../schemas/task.schema";

import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    },
  });

  const createTask = (values: TaskFormValues) => {
    const now = new Date().toISOString();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate || null,
      createdAt: now,
      updatedAt: now,
      order: 0,
    };

    onSubmit(newTask);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(createTask)}
      style={{
        display: "grid",
        gap: "16px",
        maxWidth: "440px",
      }}
    >
      <h2>Create New Task</h2>

      <Input
        label="Task title"
        placeholder="Enter task title"
        required
        error={errors.title?.message}
        {...register("title")}
      />

      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          {...register("description")}
          rows={4}
          style={{ width: "100%", padding: "12px" }}
        />
        {errors.description && <p role="alert">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>
        <select id="task-priority" {...register("priority")}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="task-status">Status</label>
        <select id="task-status" {...register("status")}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <Input label="Due date" type="date" {...register("dueDate")} />

      <Button type="submit">Create Task</Button>
    </form>
  );
}
