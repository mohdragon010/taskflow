"use client"

import CreateDialog from "@/components/createDialog";
import TasksList from "@/components/taskList";
import { AuthGuard } from "@/hooks/authGuard"

export default function Home() {
    return (
        <AuthGuard>
            <div className="flex justify-between m-10">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <CreateDialog />
            </div>
            <div className="m-10">
                <TasksList />
            </div>
        </AuthGuard>
    )
}