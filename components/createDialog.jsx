"use client"

import * as React from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PlusCircle } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth"

export default function CreateDialog() {
    const { user } = useAuth();
    const [title, setTitle] = React.useState("");
    const [open, setOpen] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user || !title.trim()) return
        try {
            await addDoc(collection(db, "tasks"), {
                title,
                completed: false,
                userId: user.uid,
                createdAt: serverTimestamp(),
            });
            setTitle("")
            setOpen(false)
        } catch (err) {
            console.error(err)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full shadow-lg group">
                    <PlusCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                    Create New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Create Task</DialogTitle>
                        <DialogDescription>
                            Enter a title for your new task. Keep it concise and actionable.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Task Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g., Complete project proposal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3 rounded-xl focus-visible:ring-primary"
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
                        <Button type="submit" className="rounded-xl px-8" disabled={!title.trim()}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}