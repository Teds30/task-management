import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/features/auth/context/AuthContext'
import { QueryProvider } from '@/providers/QueryProvider'

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <AuthProvider>
                {children}
                <Toaster position="bottom-right" closeButton richColors />
            </AuthProvider>
        </QueryProvider>
    )
}
