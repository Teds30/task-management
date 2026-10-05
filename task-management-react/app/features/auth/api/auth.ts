import { api, type ApiResponse } from '@/lib/api-client'
import type { AuthUser } from '@/features/auth/lib/auth'

export type { AuthUser } from '@/features/auth/lib/auth'

interface LoginResponse {
    user: AuthUser
    token: string
}

export async function loginRequest(username: string, password: string) {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
        username,
        password,
    })
    return response.data.data
}

export async function logoutRequest(): Promise<void> {
    await api.post('/auth/logout')
}
