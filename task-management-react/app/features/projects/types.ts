export const STATUS_OPTIONS = [
  { value: "planning", label: "Planning" },
  { value: "in_progress", label: "In Progress" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
] as const;

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export type StatusValue = (typeof STATUS_OPTIONS)[number]["value"];
export type StatusLabel = (typeof STATUS_OPTIONS)[number]["label"];
export type PriorityValue = (typeof PRIORITY_OPTIONS)[number]["value"];
export type PriorityLabel = (typeof PRIORITY_OPTIONS)[number]["label"];

export interface Project {
  id: number;
  clientName: string;
  projectName: string;
  description: string | null;
  status: StatusLabel;
  priority: PriorityLabel;
  startDate: string;
  dueDate: string;
}

export interface ProjectFormValues {
  clientName: string;
  projectName: string;
  description: string;
  status: StatusValue;
  priority: PriorityValue;
  startDate: string;
  dueDate: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ListParams {
  page: number;
  perPage: number;
  search?: string;
  status?: StatusValue;
  priority?: PriorityValue;
  sortBy?: "id" | "name" | "client_name" | "status" | "priority" | "created_at" | "updated_at";
  sortDirection?: "asc" | "desc";
}
