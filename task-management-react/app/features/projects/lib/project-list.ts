import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    type ListParams,
    type PriorityValue,
    type StatusValue,
} from '@/features/projects/types'

export const SORT_OPTIONS = [
    { value: 'id', label: 'Project ID' },
    { value: 'name', label: 'Project name' },
    { value: 'client_name', label: 'Client name' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'created_at', label: 'Date created' },
    { value: 'updated_at', label: 'Date updated' },
] as const

type SortBy = (typeof SORT_OPTIONS)[number]['value']

export function parseListParams(searchParams: URLSearchParams): ListParams {
    const rawPage = Number(searchParams.get('page'))
    const rawPerPage = Number(searchParams.get('per_page'))
    const rawStatus = searchParams.get('status')
    const rawPriority = searchParams.get('priority')
    const rawSortBy = searchParams.get('sort_by')
    const rawSortDirection = searchParams.get('sort_direction')
    const search = searchParams.get('search')?.trim()

    return {
        page: Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1,
        perPage:
            Number.isInteger(rawPerPage) && rawPerPage >= 1 && rawPerPage <= 100
                ? rawPerPage
                : 15,
        ...(search ? { search } : {}),
        ...(STATUS_OPTIONS.some((option) => option.value === rawStatus)
            ? { status: rawStatus as StatusValue }
            : {}),
        ...(PRIORITY_OPTIONS.some((option) => option.value === rawPriority)
            ? { priority: rawPriority as PriorityValue }
            : {}),
        ...(SORT_OPTIONS.some((option) => option.value === rawSortBy)
            ? { sortBy: rawSortBy as SortBy }
            : {}),
        ...(rawSortDirection === 'asc' || rawSortDirection === 'desc'
            ? { sortDirection: rawSortDirection }
            : {}),
    }
}
