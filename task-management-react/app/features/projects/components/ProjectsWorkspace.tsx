import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router'
import {
    CircleAlert,
    ClipboardList,
    Plus,
    RefreshCw,
} from 'lucide-react'

import { AppShell } from '@/components/layout/AppShell'
import { useAuth } from '@/features/auth/context/AuthContext'
import { StatePanel } from '@/components/feedback/StatePanel'
import { ProjectSkeleton } from '@/features/projects/components/ProjectSkeleton'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/features/projects/hooks/useProjects'
import type { Project } from '@/features/projects/types'
import { getApiErrorMessage } from '@/lib/api-errors'
import { parseListParams, SORT_OPTIONS } from '@/features/projects/lib/project-list'

const ProjectForm = lazy(() => import('@/features/projects/components/ProjectForm'))
const ProjectList = lazy(() => import('@/features/projects/components/ProjectList'))
const ProjectDetailsDialog = lazy(() => import('@/features/projects/components/ProjectDetailsDialog'))
const ProjectFilters = lazy(() => import('@/features/projects/components/ProjectFilters'))
const DeleteProjectDialog = lazy(() =>
    import('@/features/projects/components/DeleteProjectDialog').then((module) => ({
        default: module.DeleteProjectDialog,
    })),
)
const SEARCH_DEBOUNCE_MS = 350

export default function ProjectsWorkspace() {
    const { authReady, isAuthenticated } = useAuth()

    if (!authReady) {
        return (
            <main
                className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500"
                role="status"
            >
                Checking your session…
            </main>
        )
    }

    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <ProjectsPage />
}

function ProjectsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const listParams = parseListParams(searchParams)
    const { page, perPage } = listParams
    const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '')
    const [formOpen, setFormOpen] = useState(false)

    const [editingProject, setEditingProject] = useState<Project | undefined>()
    const [deletingProject, setDeletingProject] = useState<Project | null>(null)
    const [viewingProject, setViewingProject] = useState<Project | null>(null)

    const { data, isPending, isError, error, refetch, isFetching } =
        useProjects(listParams)

    useEffect(() => {
        setSearchInput(searchParams.get('search') ?? '')
    }, [searchParams])

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const search = searchInput.trim()
            setSearchParams(
                (current) => {
                    const next = new URLSearchParams(current)
                    const currentSearch = next.get('search') ?? ''
                    if (search === currentSearch) return current

                    if (search) next.set('search', search)
                    else next.delete('search')
                    return next
                },
                { replace: true },
            )
        }, SEARCH_DEBOUNCE_MS)

        return () => window.clearTimeout(timeoutId)
    }, [searchInput, setSearchParams])

    const updateListQuery = (
        updates: Record<string, string | null>,
        resetPage = true,
    ) => {
        setSearchParams(
            (current) => {
                const next = new URLSearchParams(current)
                Object.entries(updates).forEach(([key, value]) => {
                    if (value === null || value === '') next.delete(key)
                    else next.set(key, value)
                })
                if (resetPage) next.set('page', '1')
                return next
            },
            { replace: true },
        )
    }

    const hasActiveFilters = Boolean(
        listParams.search || listParams.status || listParams.priority,
    )
    const hasListQuery = Boolean(
        listParams.search ||
            listParams.status ||
            listParams.priority ||
            listParams.sortBy ||
            listParams.sortDirection,
    )

    const projects = data?.items ?? []
    const meta = data?.meta
    const todayLabel = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
        .format(new Date())
        .toUpperCase()

    const openCreate = () => {
        setEditingProject(undefined)
        setFormOpen(true)
    }

    const openEdit = (project: Project) => {
        setEditingProject(project)
        setFormOpen(true)
    }

    return (
        <>
            <AppShell projectCount={meta?.total}>
                <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 lg:px-10">
                    <div className="mb-6 flex items-end justify-between gap-6 max-sm:items-start">
                        <div>
                            <p className="mb-0 flex items-center gap-3 text-xs font-bold tracking-widest text-slate-400">
                                {todayLabel}{' '}
                                <span className="h-px w-7 bg-violet-200" />
                            </p>
                            <h1 className="mb-1 mt-2 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                                Your projects
                            </h1>
                        </div>
                        <Button
                            className="shadow-md shadow-violet-200 max-sm:size-10 max-sm:px-0"
                            onClick={openCreate}
                        >
                            <Plus className="size-4 shrink-0" />
                            <span className="max-sm:sr-only">New project</span>
                        </Button>
                    </div>

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5">
                        <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 max-sm:px-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="m-0 text-base font-semibold tracking-tight text-slate-800">
                                        Project overview
                                    </h2>
                                    <span className="grid h-6 min-w-6 place-items-center rounded-md bg-violet-50 px-1.5 text-xs font-bold text-violet-700">
                                        {meta?.total ?? 0}
                                    </span>
                                </div>
                                <p className="mb-0 mt-1 text-xs text-slate-400">
                                    Every client commitment, all in one place.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => void refetch()}
                                disabled={isFetching}
                                aria-label="Refresh projects"
                            >
                                <RefreshCw
                                    className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
                                />
                                <span className="max-sm:hidden">Refresh</span>
                            </Button>
                        </div>

                        <Suspense
                            fallback={
                                <div
                                    className="grid gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:grid-cols-2 lg:grid-cols-6 max-sm:px-3"
                                    aria-label="Loading search and filters"
                                >
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span
                                            key={index}
                                            className="h-10 animate-pulse rounded-lg bg-slate-200"
                                        />
                                    ))}
                                </div>
                            }
                        >
                            <ProjectFilters
                                searchInput={searchInput}
                                listParams={listParams}
                                sortOptions={SORT_OPTIONS}
                                hasListQuery={hasListQuery}
                                onSearchInputChange={setSearchInput}
                                onUpdateListQuery={updateListQuery}
                            />
                        </Suspense>

                        {isPending ? (
                            <ProjectSkeleton />
                        ) : isError ? (
                            <StatePanel
                                tone="danger"
                                icon={<CircleAlert className="size-5" />}
                                title="We couldn't load your projects"
                                description={getApiErrorMessage(error, {
                                    fallback: 'Please check your connection and try again.',
                                    networkMessage:
                                        'We could not reach the project service. Check your connection and try again.',
                                    statusMessages: {
                                        401: 'Your session may have expired. Sign in again and retry.',
                                    },
                                })}
                                action={
                                    <Button
                                        variant="secondary"
                                        size="compact"
                                        onClick={() => void refetch()}
                                    >
                                        <RefreshCw className="size-4" /> Try again
                                    </Button>
                                }
                            />
                        ) : projects.length === 0 ? (
                            <StatePanel
                                icon={<ClipboardList className="size-5" />}
                                title={hasActiveFilters ? 'No matching projects' : 'No projects yet'}
                                description={
                                    hasActiveFilters
                                        ? 'Try changing or clearing your search and filters.'
                                        : 'Create your first project'
                                }
                                action={
                                    hasActiveFilters ? (
                                        <Button
                                            variant="secondary"
                                            size="compact"
                                            onClick={() => updateListQuery({ search: null, status: null, priority: null })}
                                        >
                                            Clear filters
                                        </Button>
                                    ) : (
                                        <Button size="compact" onClick={openCreate}>
                                            <Plus className="size-4" /> Create a project
                                        </Button>
                                    )
                                }
                            />
                        ) : (
                            <Suspense fallback={<ProjectSkeleton />}>
                                <ProjectList
                                    projects={projects}
                                    meta={meta}
                                    page={page}
                                    perPage={perPage}
                                    isFetching={isFetching}
                                    onPageChange={(nextPage) => updateListQuery({ page: String(nextPage) }, false)}
                                    onPerPageChange={(nextPerPage) => updateListQuery({ per_page: String(nextPerPage) })}
                                    onView={setViewingProject}
                                    onEdit={openEdit}
                                    onDelete={setDeletingProject}
                                />
                            </Suspense>
                        )}
                    </section>
                </div>
            </AppShell>

            <Suspense fallback={null}>
                {formOpen && <ProjectForm open={formOpen} project={editingProject} onOpenChange={setFormOpen} />}
            </Suspense>
            <Suspense fallback={null}>
                {viewingProject && (
                    <ProjectDetailsDialog
                        project={viewingProject}
                        onOpenChange={(open: boolean) => !open && setViewingProject(null)}
                    />
                )}
            </Suspense>
            <Suspense fallback={null}>
                {deletingProject && (
                    <DeleteProjectDialog
                        project={deletingProject}
                        onOpenChange={(open) => !open && setDeletingProject(null)}
                        onDeleted={() => {
                            if (projects.length === 1 && page > 1)
                                updateListQuery({ page: String(page - 1) }, false)
                            setDeletingProject(null)
                        }}
                    />
                )}
            </Suspense>
        </>
    )
}
