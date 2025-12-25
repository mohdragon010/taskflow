"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, CheckSquare, ArrowRight, LogOut, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tasks", label: "Tasks" },
    { href: "/analytics", label: "Analytics" },
    { href: "/settings", label: "Settings" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const [scrolled, setScrolled] = React.useState(false)
    const { user, loading, signout } = useAuth()

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "border-b bg-background/80 backdrop-blur-md py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:rotate-12">
                                <CheckSquare className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                                TaskFlow
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                                            isActive ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <ThemeToggle />

                            {!loading && (
                                user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden border">
                                                {user.photoURL ? (
                                                    <Image
                                                        src={user.photoURL}
                                                        alt={user.displayName || "User"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end" forceMount>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={signout} className="text-destructive focus:text-destructive">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Button size="sm" className="rounded-full px-5 group" asChild>
                                        <Link href="/signup">
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                )
                            )}
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="flex md:hidden items-center gap-2">
                            <ThemeToggle />
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] border-l bg-background/95 backdrop-blur-xl">
                                    <SheetHeader className="mb-8">
                                        <SheetTitle className="text-left flex items-center space-x-2">
                                            <div className="bg-primary p-1.5 rounded-lg">
                                                <CheckSquare className="h-5 w-5 text-primary-foreground" />
                                            </div>
                                            <span>TaskFlow</span>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col space-y-2">
                                        {navLinks.map((link) => {
                                            const isActive = pathname === link.href
                                            return (
                                                <SheetClose asChild key={link.href}>
                                                    <Link
                                                        href={link.href}
                                                        className={cn(
                                                            "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-all hover:bg-accent",
                                                            isActive ? "bg-accent text-primary" : "text-muted-foreground"
                                                        )}
                                                    >
                                                        {link.label}
                                                        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                                    </Link>
                                                </SheetClose>
                                            )
                                        })}
                                        <div className="pt-4 mt-4 border-t">
                                            {!loading && (
                                                user ? (
                                                    <Button variant="destructive" className="w-full rounded-xl flex items-center justify-center gap-2" onClick={() => { signout(); setIsOpen(false); }}>
                                                        {user.photoURL ? (
                                                            <div className="relative h-5 w-5 overflow-hidden rounded-full border border-white/20">
                                                                <Image
                                                                    src={user.photoURL}
                                                                    alt="User"
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <User className="h-4 w-4" />
                                                        )}
                                                        <LogOut className="h-4 w-4" />
                                                        Sign Out
                                                    </Button>
                                                ) : (
                                                    <Button className="w-full rounded-xl py-6 text-base" asChild onClick={() => setIsOpen(false)}>
                                                        <Link href="/signup">Get Started</Link>
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
