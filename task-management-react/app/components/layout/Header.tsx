import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronRight, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { logoutRequest } from '@/features/auth/api/auth'
import { useAuth } from '@/features/auth/context/AuthContext'
import { Button } from '@/components/ui/button'

export function Header() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { signOut } = useAuth()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await logoutRequest()
        } catch {
            toast.error('The server could not confirm logout. Your session was cleared.')
        } finally {
            signOut()
            queryClient.clear()
            navigate('/login', { replace: true })
            setIsLoggingOut(false)
        }
    }

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8 lg:px-10">
            <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>Workspace</span>
                <ChevronRight className="size-4 text-slate-300" aria-hidden="true" />
                <strong className="font-semibold text-slate-700">Projects</strong>
            </div>
            <Button
                className="text-xs"
                variant="outline"
                size="sm"
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
            >
                <LogOut className="size-4" aria-hidden="true" />
                {isLoggingOut ? 'Signing out…' : 'Log out'}
            </Button>
        </header>
    )
}
