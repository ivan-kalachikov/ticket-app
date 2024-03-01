import z from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description is too long"),
  status: z
    .string()
    .min(1, "Status shouldn't be empty")
    .max(10, "Status is too long")
    .optional(),
  priority: z
    .string()
    .min(1, "Priority shouldn't be empty")
    .max(10, "Priority is too long")
    .optional(),
});
