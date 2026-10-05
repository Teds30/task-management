import dayjs from 'dayjs'
import { CalendarDays, X } from 'lucide-react'

import { ProjectStatusBadge } from '@/features/projects/components/ProjectStatusBadge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/features/projects/types'

interface ProjectDetailsDialogProps {
    project: Project
    onOpenChange: (open: boolean) => void
}

function formatDate(value: string) {
    return dayjs(value).format('MMMM D, YYYY')
}

export default function ProjectDetailsDialog({ project, onOpenChange }: ProjectDetailsDialogProps) {
    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}
        >
            <section className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl max-sm:p-4" role="dialog" aria-modal="true" aria-labelledby="project-details-title">
                <header className="mb-6 flex items-start justify-between gap-5">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className="min-w-0">
                            <h2 id="project-details-title" className="m-0 truncate text-xl font-semibold tracking-tight text-slate-800">{project.projectName}</h2>
                            <p className="mb-0 mt-1 text-sm text-slate-500">{project.clientName}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon-lg" type="button" aria-label="Close project details" onClick={() => onOpenChange(false)}>
                        <X className="size-5" />
                    </Button>
                </header>

                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 border-y border-slate-100 py-4 max-sm:gap-x-4">
                    <div><dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</dt><dd className="m-0"><ProjectStatusBadge value={project.status} kind="status" /></dd></div>
                    <div><dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Priority</dt><dd className="m-0"><ProjectStatusBadge value={project.priority} kind="priority" /></dd></div>
                    <div>
                        <dt className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400"><CalendarDays className="size-3.5" aria-hidden="true" />Start date</dt>
                        <dd className="m-0 text-sm font-medium text-slate-700">{formatDate(project.startDate)}</dd>
                    </div>
                    <div>
                        <dt className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400"><CalendarDays className="size-3.5" aria-hidden="true" />Due date</dt>
                        <dd className="m-0 text-sm font-medium text-slate-700">{formatDate(project.dueDate)}</dd>
                    </div>
                </dl>

                <section className="min-h-48 py-5" aria-labelledby="project-description-title">
                    <h3 id="project-description-title" className="mb-2 mt-0 text-xs font-semibold uppercase tracking-wider text-slate-400">Description</h3>
                    <p className="m-0 whitespace-pre-wrap text-sm leading-6 text-slate-600">{project.description?.trim() || 'No description provided.'}</p>
                </section>

                <footer className="mt-6 flex justify-end border-t border-slate-100 pt-4">
                    <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>Close</Button>
                </footer>
            </section>
        </div>
    )
}
