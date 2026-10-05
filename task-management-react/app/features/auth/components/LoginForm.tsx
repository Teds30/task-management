import { useEffect, useState, type FormEvent } from 'react'
import { CircleAlert, Eye, LockKeyhole, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/context/AuthContext'
import { loginRequest } from '@/features/auth/api/auth'
import { StatePanel } from '@/components/feedback/StatePanel'
import { getApiErrorMessage } from '@/lib/api-errors'

export function LoginForm() {
    const navigate = useNavigate()
    const { authReady, isAuthenticated, signIn } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (authReady && isAuthenticated) navigate('/', { replace: true })
    }, [authReady, isAuthenticated, navigate])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)
        try {
            const { token, user } = await loginRequest(username.trim(), password)
            signIn(user, token)
            navigate('/', { replace: true })
        } catch (requestError: unknown) {
            setError(
                getApiErrorMessage(requestError, {
                    fallback: 'Please try signing in again.',
                    networkMessage:
                        'We could not reach the sign-in service. Check your connection and try again.',
                    statusMessages: {
                        401: 'The username or password did not match. Check your credentials and try again.',
                        422: 'Check the username and password, then try again.',
                        429: 'Too many sign-in attempts. Wait a moment and try again.',
                        500: 'The sign-in service is temporarily unavailable. Try again shortly.',
                        503: 'The sign-in service is temporarily unavailable. Try again shortly.',
                    },
                }),
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 font-sans text-slate-800">
            <div className="w-full max-w-md">
                <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 max-sm:p-5">
                    <div className="mb-6 grid size-12 place-items-center rounded-xl bg-violet-100 text-violet-700">
                        <LockKeyhole className="size-5" aria-hidden="true" />
                    </div>
                    <h1 className="mb-2 mt-0 text-2xl font-bold tracking-tight text-slate-800">
                        Welcome
                    </h1>
                    <p className="mb-6 mt-0 text-sm leading-relaxed text-slate-500">
                        Sign in with the demo account to continue.
                    </p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                            Username
                            <span className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 px-3 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                                <UserRound className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                                <input
                                    className="min-w-0 flex-1 bg-transparent text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                        setError('')
                                    }}
                                    required
                                />
                            </span>
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                            Password
                            <span className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 px-3 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                                <Eye className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
                                <input
                                    className="min-w-0 flex-1 bg-transparent text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                        setError('')
                                    }}
                                    required
                                />
                            </span>
                        </label>

                        {error && (
                            <StatePanel
                                compact
                                role="alert"
                                tone="danger"
                                icon={<CircleAlert className="size-4" />}
                                title="We couldn't sign you in"
                                description={error}
                            />
                        )}

                        <Button className="mt-1 w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing in…' : 'Sign in'}
                        </Button>
                    </form>

                    <aside className="mt-6 rounded-xl border border-violet-100 bg-violet-50/70 p-4" aria-label="Demo credentials">
                        <p className="mb-2 mt-0 text-xs font-bold uppercase tracking-wider text-violet-800">
                            Demo account
                        </p>
                        <div className="m-0 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1 text-sm">
                            <p className="text-slate-500">Username</p>
                            <p className="m-0 font-semibold text-slate-700">demo</p>
                            <p className="text-slate-500">Password</p>
                            <p className="m-0 font-semibold text-slate-700">password</p>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    )
}
