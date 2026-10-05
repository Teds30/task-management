import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import dayjs from "dayjs";

import type { ApiErrorBody } from "@/lib/api-client";
import { FIELD_MAP, toFormValues } from "@/features/projects/api/projects";
import { projectSchema } from "@/features/projects/schemas/project.schema";
import { Button } from "@/components/ui/button";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  type Project,
  type ProjectFormValues,
} from "@/features/projects/types";
import { useCreateProject, useUpdateProject } from "@/features/projects/hooks/useProjects";

interface ProjectFormProps {
  open: boolean;
  project?: Project;
  onOpenChange: (open: boolean) => void;
}

const EMPTY_VALUES: ProjectFormValues = {
  clientName: "",
  projectName: "",
  description: "",
  status: "planning",
  priority: "medium",
  startDate: "",
  dueDate: "",
};

export default function ProjectForm({ open, project, onOpenChange }: ProjectFormProps) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [serverErrors, setServerErrors] = useState<Partial<Record<keyof ProjectFormValues, string>>>({});
  const form = useForm({
    defaultValues: project ?? EMPTY_VALUES,
    validators: {
      onSubmit: projectSchema,
    },
    onSubmit: async ({ value }) => {
      const values = projectSchema.parse(value);
      setServerErrors({});

      try {
        if (project) await updateProject.mutateAsync({ id: project.id, values });
        else await createProject.mutateAsync(values);

        onOpenChange(false);
      } catch (error: unknown) {
        if (axios.isAxiosError<ApiErrorBody>(error) && error.response?.status === 422 && error.response.data.errors) {
          const mappedErrors: Partial<Record<keyof ProjectFormValues, string>> = {};
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            const name = FIELD_MAP[field];
            if (name && messages[0]) mappedErrors[name] = messages[0];
          });
          setServerErrors(mappedErrors);
        } else {
          const message = axios.isAxiosError<ApiErrorBody>(error)
            ? error.response?.data.message ?? error.message
            : error instanceof Error ? error.message : "Something went wrong. Please try again.";
          toast.error(message);
        }
      }
    },
  });
  const isPending = createProject.isPending || updateProject.isPending;

  useEffect(() => {
    if (open) {
      form.reset(project ? toFormValues(project) : EMPTY_VALUES);
      setServerErrors({});
    }
  }, [form, open, project]);

  if (!open) return null;

  const getFieldError = (name: keyof ProjectFormValues, errors: unknown[]) => {
    const error = errors[0];
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      return error.message;
    }
    return serverErrors[name];
  };

  const clearServerError = (name: keyof ProjectFormValues) => {
    setServerErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}>
      <section className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl max-sm:p-4" role="dialog" aria-modal="true" aria-labelledby="project-form-title">
        <header className="mb-6 flex items-start justify-between gap-5">
          <div>
            <h2 id="project-form-title" className="mb-1 mt-2 text-xl font-semibold tracking-tight text-slate-800">{project ? "Edit project" : "Create a project"}</h2>
            <p className="m-0 text-sm text-slate-500">Keep the important details in one place.</p>
          </div>
          <Button variant="ghost" size="icon-lg" type="button" aria-label="Close dialog" onClick={() => onOpenChange(false)}><X className="size-5" /></Button>
        </header>

        <form onSubmit={(event) => { event.preventDefault(); event.stopPropagation(); void form.handleSubmit(); }} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="clientName">
              {(field) => {
                const error = getFieldError("clientName", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Client name <em className="text-rose-600 not-italic">*</em></span>
                    <input className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => { clearServerError("clientName"); field.handleChange(event.target.value); }} aria-invalid={Boolean(error)} placeholder="e.g. Acme Studio" maxLength={255} />
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="projectName">
              {(field) => {
                const error = getFieldError("projectName", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Project name <em className="text-rose-600 not-italic">*</em></span>
                    <input className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => { clearServerError("projectName"); field.handleChange(event.target.value); }} aria-invalid={Boolean(error)} placeholder="e.g. Website redesign" maxLength={255} />
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="description">
              {(field) => {
                const error = getFieldError("description", field.state.meta.errors);
                return (
                  <label className="col-span-full flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Description <small className="ml-1 text-xs font-normal text-slate-400">Optional</small></span>
                    <textarea className="min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal leading-relaxed text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" name={field.name} value={field.state.value ?? ''} onBlur={field.handleBlur} onChange={(event) => { clearServerError("description"); field.handleChange(event.target.value); }} aria-invalid={Boolean(error)} placeholder="A short overview of the project" rows={3} />
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="status">
              {(field) => {
                const error = getFieldError("status", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Status</span>
                    <select className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => { clearServerError("status"); field.handleChange(event.target.value as ProjectFormValues["status"]); }} aria-invalid={Boolean(error)}>
                      {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="priority">
              {(field) => {
                const error = getFieldError("priority", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Priority</span>
                    <select className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(event) => { clearServerError("priority"); field.handleChange(event.target.value as ProjectFormValues["priority"]); }} aria-invalid={Boolean(error)}>
                      {PRIORITY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="startDate">
              {(field) => {
                const error = getFieldError("startDate", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Start date <em className="text-rose-600 not-italic">*</em></span>
                    <input className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" type="date" name={field.name} value={dayjs(field.state.value).format("YYYY-MM-DD")} onBlur={field.handleBlur} onChange={(event) => { clearServerError("startDate"); field.handleChange(event.target.value); }} aria-invalid={Boolean(error)} />
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
            <form.Field name="dueDate">
              {(field) => {
                const error = getFieldError("dueDate", field.state.meta.errors);
                return (
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-slate-600">
                    <span>Due date <em className="text-rose-600 not-italic">*</em></span>
                    <input className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 aria-[invalid=true]:border-rose-400" type="date" name={field.name} value={dayjs(field.state.value).format("YYYY-MM-DD")} onBlur={field.handleBlur} onChange={(event) => { clearServerError("dueDate"); field.handleChange(event.target.value); }} aria-invalid={Boolean(error)} />
                    {error && <small className="text-xs font-normal text-rose-600">{error}</small>}
                  </label>
                );
              }}
            </form.Field>
          </div>
          <footer className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="shadow-sm">{isPending ? "Saving…" : project ? "Save changes" : "Create project"}</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}
