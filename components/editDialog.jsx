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
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Pencil } from "lucide-react";
import { db } from "@/lib/firebase";
import { updateDoc, doc } from "firebase/firestore"

export default function EditDialog({ taskToEdit, open, onOpenChange }) {
    const [title, setTitle] = React.useState("")
    const [isSaving, setIsSaving] = React.useState(false)

    React.useEffect(() => {
        if (taskToEdit && open) {
            setTitle(taskToEdit.title)
        }
    }, [taskToEdit, open])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!taskToEdit || !title.trim()) return

        setIsSaving(true)
        try {
            const taskRef = doc(db, "tasks", taskToEdit.id)
            await updateDoc(taskRef, {
                title: title.trim()
            })
            onOpenChange(false)
        } catch (err) {
            console.error("Error updating task:", err)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <Pencil className="h-5 w-5 text-primary" />
                            Edit Task
                        </DialogTitle>
                        <DialogDescription>
                            Change the title of your task. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-title" className="text-sm font-medium">
                                Task Title
                            </Label>
                            <Input
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="rounded-xl focus-visible:ring-primary"
                                autoFocus
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-xl">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-xl px-8" disabled={isSaving || !title.trim()}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
