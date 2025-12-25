"use client"

import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }) {
    const router = useRouter();
    const { user, loading } = useAuth();
    useEffect(() => {
        if (!user && !loading) {
            router.push("/signup");
        }
    }, [user, loading, router]);
    if (loading) return <>Loading....</>
    return user ? children : null;
}