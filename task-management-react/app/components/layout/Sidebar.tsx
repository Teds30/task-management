import { FolderKanban } from 'lucide-react'
import { Link } from 'react-router'

import { useAuth } from '@/features/auth/context/AuthContext'

interface SidebarProps {
    projectCount?: number
}

export function Sidebar({ projectCount }: SidebarProps) {
    const { user } = useAuth()

    const initials = user?.name
        ?.split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')

    return (
        <aside className="flex min-h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
            <Link
                to="/"
                className="mb-5 flex items-center gap-3 px-2 text-xl font-bold tracking-tight text-slate-900 no-underline"
                aria-label="Koda home"
            >
                <span className="grid size-8 place-items-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">
                    <FolderKanban className="size-4" />
                </span>
                <span>Koda</span>
            </Link>
            <p className="mb-3 px-2 text-xs font-bold tracking-widest text-slate-400">WORKSPACE</p>
            <nav className="flex flex-col gap-1" aria-label="Main navigation">
                <Link
                    to="/"
                    aria-current="page"
                    className="flex min-h-10 items-center gap-3 rounded-lg bg-violet-50 px-3 text-sm font-semibold text-violet-700 no-underline transition-colors hover:bg-violet-100"
                >
                    <FolderKanban className="size-4" />
                    <span>Projects</span>
                    <span className="ml-auto text-xs text-violet-600">{projectCount ?? '—'}</span>
                </Link>
            </nav>
            <div className="mt-auto">
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-100 text-xs font-bold text-amber-900">
                        {initials || 'U'}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <strong className="text-sm font-semibold text-slate-700">{user?.name || 'User'}</strong>
                        <small className="truncate text-xs text-slate-400">{user?.email || 'Signed in'}</small>
                    </span>
                </div>
            </div>
        </aside>
    )
}
