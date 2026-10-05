import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { api, type ApiErrorBody, type ApiResponse } from "@/lib/api-client";
import { toPayload } from "@/features/projects/api/projects";
import type { ListParams, PaginationMeta, Project, ProjectFormValues } from "@/features/projects/types";

const PROJECTS_KEY = ["projects"] as const;

export const useProjects = (params: ListParams) =>
  useQuery({
    queryKey: [...PROJECTS_KEY, "list", params],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Project[], PaginationMeta>>("/projects", {
        params: {
          page: params.page,
          per_page: params.perPage,
          search: params.search,
          status: params.status,
          priority: params.priority,
          sort_by: params.sortBy,
          sort_direction: params.sortDirection,
        },
      });
      return {
        items: response.data.data,
        meta: response.data.meta ?? {
          current_page: params.page,
          last_page: 1,
          per_page: params.perPage,
          total: response.data.data.length,
        },
      };
    },
    placeholderData: keepPreviousData,
  });

export const useProject = (id?: number) =>
  useQuery({
    queryKey: [...PROJECTS_KEY, id],
    queryFn: async () => (await api.get<ApiResponse<Project>>(`/projects/${id}`)).data.data,
    enabled: id !== undefined,
  });

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: ProjectFormValues) =>
      (await api.post<ApiResponse<Project>>("/projects", toPayload(values))).data.data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Project created", { description: "Your project is ready to track." });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: ProjectFormValues }) =>
      (await api.put<ApiResponse<Project>>(`/projects/${id}`, toPayload(values))).data.data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Changes saved", { description: "The project has been updated." });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/projects/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      toast.success("Project deleted");
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<ApiErrorBody>(error)
        ? error.response?.data.message ?? error.message
        : error instanceof Error ? error.message : "Could not delete the project.";
      toast.error(message);
    },
  });
}
