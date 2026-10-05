import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  type Project,
  type ProjectFormValues,
} from "@/features/projects/types";

export const toPayload = (values: ProjectFormValues) => ({
  client_name: values.clientName,
  name: values.projectName,
  description: values.description,
  status: values.status,
  priority: values.priority,
  start_date: values.startDate,
  due_date: values.dueDate,
});

export const toFormValues = (project: Project): ProjectFormValues => ({
  clientName: project.clientName,
  projectName: project.projectName,
  description: project.description ?? "",
  status: STATUS_OPTIONS.find((option) => option.label === project.status)?.value ?? "planning",
  priority: PRIORITY_OPTIONS.find((option) => option.label === project.priority)?.value ?? "medium",
  startDate: project.startDate.slice(0, 10),
  dueDate: project.dueDate.slice(0, 10),
});

export const FIELD_MAP: Record<string, keyof ProjectFormValues> = {
  client_name: "clientName",
  name: "projectName",
  description: "description",
  status: "status",
  priority: "priority",
  start_date: "startDate",
  due_date: "dueDate",
};
