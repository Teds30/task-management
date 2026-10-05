import axios from 'axios'
import type { ApiErrorBody } from '@/lib/api-client'

interface ApiErrorOptions {
    fallback: string
    networkMessage?: string
    statusMessages?: Partial<Record<number, string>>
}

export function getApiErrorMessage(
    error: unknown,
    { fallback, networkMessage, statusMessages }: ApiErrorOptions,
): string {
    if (!axios.isAxiosError<ApiErrorBody>(error)) {
        return error instanceof Error ? error.message : fallback
    }

    const response = error.response
    if (!response) return networkMessage ?? fallback

    const statusMessage = statusMessages?.[response.status]
    if (statusMessage) return statusMessage

    const responseMessage = response.data?.message?.trim()
    if (responseMessage) return responseMessage

    const validationMessage = Object.values(response.data?.errors ?? {})
        .flatMap((messages) => (Array.isArray(messages) ? messages : []))
        .find((message): message is string => typeof message === 'string' && Boolean(message.trim()))

    return validationMessage ?? fallback
}
