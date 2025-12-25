"use client"

import * as React from "react"
import { useAuth } from "@/hooks/useAuth"
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar, Loader2, AlertCircle, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import EditDialog from "./editDialog"
import DeleteDialog from "./deleteDialog"

export default function TasksList() {
    const [tasks, setTasks] = React.useState([])
    const [error, setError] = React.useState(null)
    const [editingTask, setEditingTask] = React.useState(null)
    const [taskToDelete, setTaskToDelete] = React.useState(null)
    const { user, loading: authLoading } = useAuth()
    const [isFetching, setIsFetching] = React.useState(true)

    React.useEffect(() => {
        if (!user) {
            setIsFetching(false)
            return
        }

        setError(null)

        // Define the query
        const q = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        )

        // Listen for updates
        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const tasksData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTasks(tasksData)
                setIsFetching(false)
            },
            (err) => {
                console.error("Firestore error:", err)
                setError(err.message)
                setIsFetching(false)
            }
        )

        return () => unsubscribe()
    }, [user])

    const toggleTask = async (id, currentStatus) => {
        try {
            await updateDoc(doc(db, "tasks", id), {
                completed: !currentStatus
            })
        } catch (err) {
            console.error("Error updating task:", err)
        }
    }

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id))
        } catch (err) {
            console.error("Error deleting task:", err)
        }
    }

    if (authLoading || isFetching) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse">Loading your tasks...</p>
            </div>
        )
    }

    if (error) {
        return (
            <Card className="border-destructive/50 bg-destructive/5 my-4">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-destructive">Query Error</h3>
                            <p className="text-sm text-destructive/80">
                                {error.includes("index")
                                    ? "Firestore needs an index to run this query. Look for a link in your browser's console (F12) to create it automatically."
                                    : error}
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => window.location.reload()}
                            >
                                Try Refreshing
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <AnimatePresence mode="popLayout">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, x: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            <Card className={cn(
                                "group transition-all duration-300 hover:shadow-md border-border/50",
                                task.completed ? "bg-muted/50 opacity-80" : "bg-card"
                            )}>
                                <CardContent className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <Checkbox
                                            checked={task.completed}
                                            onCheckedChange={() => toggleTask(task.id, task.completed)}
                                            className="h-5 w-5 rounded-md"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-base font-medium transition-all duration-300 truncate",
                                                task.completed ? "text-muted-foreground line-through decoration-primary/50" : "text-foreground"
                                            )}>
                                                {task.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    {task.createdAt?.toDate ? new Date(task.createdAt.toDate()).toLocaleDateString() : "Just now"}
                                                </span>
                                                {task.completed ? (
                                                    <Badge variant="secondary" className="text-[10px] h-4 py-0 ml-2">Done</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-[10px] h-4 py-0 ml-2 bg-primary/5 text-primary border-primary/20 italic">Todo</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-primary"
                                            onClick={() => setEditingTask(task)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() => setTaskToDelete(task)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 px-4 border-2 border-dashed border-border/50 rounded-2xl"
                    >
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No tasks yet</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                            Create your first task using the button above to get started with your productivity journey.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <EditDialog
                taskToEdit={editingTask}
                open={!!editingTask}
                onOpenChange={(open) => !open && setEditingTask(null)}
            />

            <DeleteDialog
                taskToDelete={taskToDelete}
                open={!!taskToDelete}
                onOpenChange={(open) => !open && setTaskToDelete(null)}
                onConfirm={deleteTask}
            />
        </div>
    )
}
