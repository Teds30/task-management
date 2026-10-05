export function ProjectSkeleton() {
    return (
        <div className="px-5 pb-2" aria-label="Loading projects" role="status">
            {Array.from({ length: 5 }, (_, index) => (
                <div
                    className="flex h-16 items-center gap-3 border-t border-slate-100"
                    key={index}
                >
                    <span className="size-8 animate-pulse rounded-lg bg-slate-100" />
                    <span className="h-3 flex-1 animate-pulse rounded-md bg-slate-100" />
                    <span className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
                    <span className="h-2 w-16 animate-pulse rounded-md bg-slate-100" />
                    <span className="h-2 w-16 animate-pulse rounded-md bg-slate-100" />
                </div>
            ))}
        </div>
    )
}
