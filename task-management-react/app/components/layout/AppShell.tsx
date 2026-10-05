import type { ReactNode } from 'react'

import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

interface AppShellProps {
    children: ReactNode
    projectCount?: number
}

export function AppShell({ children, projectCount }: AppShellProps) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
            <Sidebar projectCount={projectCount} />
            <main className="min-w-0 flex-1">
                <Header />
                {children}
            </main>
        </div>
    )
}
