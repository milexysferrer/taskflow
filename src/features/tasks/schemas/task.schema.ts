import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Title must be 100 characters or less"),

  description: z.string().max(1000, "Description is too long"),

  priority: z.enum(["low", "medium", "high"]),

  status: z.enum(["todo", "in-progress", "done"]),

  dueDate: z.string(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
