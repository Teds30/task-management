import { LoaderCircle, Trash2, X } from 'lucide-react'

import { useDeleteProject } from '@/features/projects/hooks/useProjects'
import { Button } from '@/components/ui/button'
import type { Project } from '@/features/projects/types'

interface DeleteProjectDialogProps {
    project: Project | null
    onOpenChange: (open: boolean) => void
    onDeleted: () => void
}

export function DeleteProjectDialog({ project, onOpenChange, onDeleted }: DeleteProjectDialogProps) {
    const deleteProject = useDeleteProject()

    if (!project) return null

    const confirmDelete = () => {
        deleteProject.mutate(project.id, { onSuccess: onDeleted })
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}>
            <section className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-2xl max-sm:p-5" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-copy">
                <Button className="absolute right-4 top-4" variant="ghost" size="icon-lg" type="button" aria-label="Close dialog" onClick={() => onOpenChange(false)}><X className="size-5" /></Button>
                <div className="mx-auto mb-4 mt-1 grid size-11 place-items-center rounded-xl bg-rose-50 text-rose-600"><Trash2 className="size-5" /></div>
                <h2 id="delete-title" className="mb-0 mt-2 text-lg font-semibold tracking-tight text-slate-800">Remove this project?</h2>
                <p id="delete-copy" className="mx-auto mb-6 mt-2 text-sm leading-relaxed text-slate-500">"{project.projectName}" will be permanently removed. This action can't be undone.</p>
                <div className="flex justify-center gap-2 max-sm:flex-col-reverse">
                    <Button variant="secondary" type="button" onClick={() => onOpenChange(false)} disabled={deleteProject.isPending}>Keep project</Button>
                    <Button variant="destructive" type="button" onClick={confirmDelete} disabled={deleteProject.isPending}>
                        {deleteProject.isPending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                        {deleteProject.isPending ? 'Deleting…' : 'Delete project'}
                    </Button>
                </div>
            </section>
        </div>
    )
}
