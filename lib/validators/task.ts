import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

export const updateTaskSchema = z.object({
    id: z.string().min(1, "Task ID is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});
