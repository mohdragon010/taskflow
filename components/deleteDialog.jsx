"use client"

import * as React from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "./ui/dialog"
import { AlertTriangle, Loader2 } from "lucide-react"

export default function DeleteDialog({ taskToDelete, open, onOpenChange, onConfirm }) {
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        if (!taskToDelete) return

        setIsDeleting(true)
        try {
            await onConfirm(taskToDelete.id)
            onOpenChange(false)
        } catch (err) {
            console.error("Error deleting task:", err)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-6 w-6" />
                        Delete Task
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-base">
                        Are you sure you want to delete <span className="font-semibold text-foreground">"{taskToDelete?.title}"</span>?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="rounded-xl flex-1 sm:flex-none">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        className="rounded-xl px-8 flex-1 sm:flex-none"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Task"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
