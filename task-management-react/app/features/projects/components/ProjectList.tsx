import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ProjectCard } from './ProjectCard'
import type { PaginationMeta, Project } from '@/features/projects/types'

interface ProjectListProps {
    projects: Project[]
    meta?: PaginationMeta
    page: number
    perPage: number
    isFetching: boolean
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onView: (project: Project) => void
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
}

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 50, 100] as const

export default function ProjectList({
    projects,
    meta,
    page,
    perPage,
    isFetching,
    onPageChange,
    onPerPageChange,
    onView,
    onEdit,
    onDelete,
}: ProjectListProps) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max border-collapse text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50">
                        <tr className="text-xs font-bold tracking-wider text-slate-400">
                            <th className="h-10 px-4 pl-5">CLIENT / PROJECT</th>
                            <th className="h-10 px-4">STATUS</th>
                            <th className="h-10 px-4">PRIORITY</th>
                            <th className="h-10 px-4">START DATE</th>
                            <th className="h-10 px-4">DUE DATE</th>
                            <th className="h-10 px-4 pr-5">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="flex min-h-14 items-center justify-between gap-3 border-t border-slate-100 px-5 text-xs text-slate-400 max-sm:px-3">
                <div className="flex items-center gap-2">
                    <span>
                        {meta ? (
                            <>
                                Page{' '}
                                <strong className="font-semibold text-slate-700">
                                    {meta.current_page}
                                </strong>{' '}
                                of{' '}
                                <strong className="font-semibold text-slate-700">
                                    {Math.max(meta.last_page, 1)}
                                </strong>
                                <span className="mx-2 text-slate-300">·</span>
                                {meta.total} {meta.total === 1 ? 'project' : 'projects'}
                            </>
                        ) : (
                            'Showing projects'
                        )}
                    </span>
                    <label className="flex items-center gap-2 text-slate-500">
                        <span>Per page</span>
                        <select
                            aria-label="Projects per page"
                            value={perPage}
                            onChange={(event) => onPerPageChange(Number(event.target.value))}
                            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                        >
                            {[...new Set([...PAGE_SIZE_OPTIONS, perPage])]
                                .sort((left, right) => left - right)
                                .map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                        disabled={!meta || page <= 1 || isFetching}
                    >
                        <ChevronLeft className="size-4" /> Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.min(meta?.last_page ?? page, page + 1))}
                        disabled={!meta || page >= meta.last_page || isFetching}
                    >
                        Next <ChevronRight className="size-4" />
                    </Button>
                </div>
            </footer>
        </>
    )
}
