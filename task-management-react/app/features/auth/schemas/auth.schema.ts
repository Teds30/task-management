import { z } from 'zod'

// Native required inputs remain the user-facing validation; this schema describes their payload shape.
export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})
