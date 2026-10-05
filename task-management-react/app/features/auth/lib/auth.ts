export interface AuthUser {
    id: number
    username: string
    name: string
    email: string
}

const AUTH_TOKEN_COOKIE = 'token'

export function getCachedAuthToken(): string | null {
    if (typeof document === 'undefined') return null

    const tokenCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith(`${AUTH_TOKEN_COOKIE}=`))

    if (!tokenCookie) return null

    const encodedToken = tokenCookie.slice(AUTH_TOKEN_COOKIE.length + 1)
    try {
        return decodeURIComponent(encodedToken) || null
    } catch {
        return null
    }
}

export function storeAuthToken(token: string): void {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secure}`
}

export function clearAuthToken(): void {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${AUTH_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`
}
