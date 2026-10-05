import { z } from "zod";

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/features/projects/types";

export const projectSchema = z
  .object({
    clientName: z.string().trim().min(1, "Client name is required").max(255),
    projectName: z.string().trim().min(1, "Project name is required").max(255),
    description: z.string().nullable(),
    status: z.enum(STATUS_OPTIONS.map(({ value }) => value)),
    priority: z.enum(PRIORITY_OPTIONS.map(({ value }) => value)),
    startDate: z.string().min(1, "Start date is required"),
    dueDate: z.string().min(1, "Due date is required"),
  })
  .refine((values) => values.dueDate >= values.startDate, {
    path: ["dueDate"],
    message: "Due date cannot be earlier than start date",
  });
