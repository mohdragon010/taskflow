"use client"

import { useState, useEffect } from 'react';
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => unsubscribe();
    }, []);

    const signout = async () => {
        try{
            await signOut(auth)
        } catch(err) {
            console.log("error signing out", err);
        };
    };
    return {user, loading, signout}
}