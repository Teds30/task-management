import dayjs from 'dayjs'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ProjectStatusBadge } from '@/features/projects/components/ProjectStatusBadge'
import type { Project } from '@/features/projects/types'

interface ProjectCardProps {
    project: Project
    onView: (project: Project) => void
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
}

function formatDate(value: string) {
    return dayjs(value).format('MMM D, YYYY')
}

export function ProjectCard({ project, onView, onEdit, onDelete }: ProjectCardProps) {
    const isOverdue =
        project.status !== 'Completed' && dayjs(project.dueDate).isBefore(dayjs(), 'day')

    return (
        <tr>
            <td className="min-w-64 border-t border-slate-100 px-4 py-3 pl-5">
                <span className="flex flex-col gap-1">
                    <strong className="max-w-56 truncate text-sm font-semibold text-slate-800">
                        {project.projectName}
                    </strong>
                    <small className="text-xs text-slate-400">{project.clientName}</small>
                </span>
            </td>
            <td className="border-t border-slate-100 px-4 py-3">
                <ProjectStatusBadge value={project.status} kind="status" />
            </td>
            <td className="border-t border-slate-100 px-4 py-3">
                <ProjectStatusBadge value={project.priority} kind="priority" />
            </td>
            <td className="border-t border-slate-100 px-4 py-3 text-xs text-slate-600">
                {formatDate(project.startDate)}
            </td>
            <td className={`border-t border-slate-100 px-4 py-3 text-xs ${isOverdue ? 'text-rose-600' : 'text-slate-600'}`}>
                {formatDate(project.dueDate)}
                {isOverdue && <small className="ml-2 text-xs text-rose-600">Overdue</small>}
            </td>
            <td className="border-t border-slate-100 px-4 py-3 pr-5">
                <div className="flex items-center justify-end gap-2">
                    <Button variant="text" size="sm" onClick={() => onView(project)}>
                        View
                    </Button>
                    <details className="group relative">
                        <summary
                            className="grid size-8 cursor-pointer list-none place-items-center rounded-lg text-slate-400 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 [&::-webkit-details-marker]:hidden"
                            aria-label={`More actions for ${project.projectName}`}
                            title="More actions"
                        >
                            <MoreHorizontal className="size-4" />
                        </summary>
                        <div className="absolute right-0 top-full z-10 mt-1 flex min-w-32 flex-col rounded-lg border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/10">
                            <button
                                className="rounded-md px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                                type="button"
                                onClick={(event) => {
                                    event.currentTarget.closest('details')?.removeAttribute('open')
                                    onEdit(project)
                                }}
                            >
                                Edit project
                            </button>
                            <button
                                className="rounded-md px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                                type="button"
                                onClick={(event) => {
                                    event.currentTarget.closest('details')?.removeAttribute('open')
                                    onDelete(project)
                                }}
                            >
                                Delete project
                            </button>
                        </div>
                    </details>
                </div>
            </td>
        </tr>
    )
}