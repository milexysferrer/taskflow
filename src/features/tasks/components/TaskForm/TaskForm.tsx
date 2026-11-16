import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Task } from "../../types/task.types";
import { taskSchema, type TaskFormValues } from "../../schemas/task.schema";

import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
}

const emptyValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const isEditing = Boolean(task);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ?? "",
      });
    } else {
      reset(emptyValues);
    }
  }, [task, reset]);

  const handleFormSubmit = (values: TaskFormValues) => {
    const now = new Date().toISOString();

    const result: Task = task
      ? {
          ...task,
          ...values,
          dueDate: values.dueDate || null,
          updatedAt: now,
        }
      : {
          id: crypto.randomUUID(),
          ...values,
          dueDate: values.dueDate || null,
          createdAt: now,
          updatedAt: now,
          order: 0,
        };

    onSubmit(result);

    if (!isEditing) {
      reset(emptyValues);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{
        display: "grid",
        gap: "16px",
        maxWidth: "440px",
      }}
    >
      <h2>{isEditing ? "Edit Task" : "Create New Task"}</h2>

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
          style={{
            width: "100%",
            padding: "12px",
            boxSizing: "border-box",
          }}
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

      <div style={{ display: "flex", gap: "12px" }}>
        {isEditing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit">
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
