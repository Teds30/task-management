import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    type ListParams,
} from '@/features/projects/types'

interface SortOption {
    value: string
    label: string
}

interface ProjectFiltersProps {
    searchInput: string
    listParams: ListParams
    sortOptions: readonly SortOption[]
    hasListQuery: boolean
    onSearchInputChange: (value: string) => void
    onUpdateListQuery: (updates: Record<string, string | null>) => void
}

export default function ProjectFilters({
    searchInput,
    listParams,
    sortOptions,
    hasListQuery,
    onSearchInputChange,
    onUpdateListQuery,
}: ProjectFiltersProps) {
    return (
        <div className="grid gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:grid-cols-2 lg:grid-cols-6 max-sm:px-3">
            <label className="relative sm:col-span-2 lg:col-span-2">
                <span className="sr-only">Search projects or clients</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="search"
                    aria-label="Search projects or clients"
                    placeholder="Search projects or clients..."
                    value={searchInput}
                    onChange={(event) => onSearchInputChange(event.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                />
            </label>
            <label>
                <span className="sr-only">Filter by status</span>
                <select
                    aria-label="Filter by status"
                    value={listParams.status ?? ''}
                    onChange={(event) => onUpdateListQuery({ status: event.target.value || null })}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="">All statuses</option>
                    {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
            </label>
            <label>
                <span className="sr-only">Filter by priority</span>
                <select
                    aria-label="Filter by priority"
                    value={listParams.priority ?? ''}
                    onChange={(event) => onUpdateListQuery({ priority: event.target.value || null })}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="">All priorities</option>
                    {PRIORITY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
            </label>
            <label>
                <span className="sr-only">Sort projects by</span>
                <select
                    aria-label="Sort projects by"
                    value={listParams.sortBy ?? 'id'}
                    onChange={(event) => {
                        const sortBy = event.target.value
                        onUpdateListQuery(sortBy === 'id' ? { sort_by: null, sort_direction: null } : { sort_by: sortBy })
                    }}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                    {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.value === 'id' ? 'Default (ID)' : option.label}</option>)}
                </select>
            </label>
            <label>
                <span className="sr-only">Sort direction</span>
                <select
                    aria-label="Sort direction"
                    value={listParams.sortDirection ?? 'desc'}
                    onChange={(event) => onUpdateListQuery({ sort_direction: event.target.value })}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            {hasListQuery && (
                <div className="flex justify-end sm:col-span-2 lg:col-span-6">
                    <Button
                        variant="text"
                        size="sm"
                        onClick={() => onUpdateListQuery({ search: null, status: null, priority: null, sort_by: null, sort_direction: null })}
                    >
                        Clear search, filters & sorting
                    </Button>
                </div>
            )}
        </div>
    )
}
