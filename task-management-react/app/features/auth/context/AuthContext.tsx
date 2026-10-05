import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

import {
    clearAuthToken,
    getCachedAuthToken,
    storeAuthToken,
    type AuthUser,
} from '@/features/auth/lib/auth'

interface AuthContextValue {
    user: AuthUser | null
    authReady: boolean
    isAuthenticated: boolean
    signIn: (user: AuthUser, token: string) => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [authReady, setAuthReady] = useState(false)
    const [hasToken, setHasToken] = useState(false)

    useEffect(() => {
        setHasToken(Boolean(getCachedAuthToken()))
        setAuthReady(true)
    }, [])

    const signIn = useCallback((authenticatedUser: AuthUser, token: string) => {
        storeAuthToken(token)
        setUser(authenticatedUser)
        setHasToken(true)
    }, [])

    const signOut = useCallback(() => {
        clearAuthToken()
        setUser(null)
        setHasToken(false)
    }, [])

    const value = useMemo(
        () => ({ user, authReady, isAuthenticated: hasToken, signIn, signOut }),
        [user, authReady, hasToken, signIn, signOut],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
