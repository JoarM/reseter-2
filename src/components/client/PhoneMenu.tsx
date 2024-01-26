"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";
import { logout } from "@/actions/user/logout";

export function PhoneMenu({
    user
}: {
    user?: {
        displayname: string;
        email: string;
    }
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <div className="group" aria-expanded={menuOpen}>
            <Button size="sm" variant="outline" className="px-0 w-9 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-4 h-4 group-aria-expanded:hidden"/>
                <X className="w-4 h-4 hidden group-aria-expanded:block"/>
            </Button>
            <nav className="fixed top-[80px] left-0 right-0 bg-muted hidden md:hidden group-aria-expanded:block px-6 z-50 border-b border-border">
                {user ? 
                    <ul>
                        <li className="py-4 flex justify-between items-center border-b border-border">
                            <span>
                                <div className="font-medium">{user.displayname}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </span>
                            <Avatar className="w-6 h-6">
                                <AvatarImage src="/user-128.png" alt="" loading="eager"/>
                                <AvatarFallback>{user.displayname}</AvatarFallback>
                            </Avatar>
                        </li>
                        <li className="border-b  border-border">
                            <Link href="/dashboard" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li className="border-b border-border py-4 flex items-center justify-between hover:bg-background focus-within:bg-background">
                            <span className="text-muted-foreground">Theme</span>
                            {mounted ? 
                                <Select value={theme} onValueChange={(e) => setTheme(e)}>
                                    <SelectTrigger className="p-2 h-8 text-sm w-28">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent className="text-sm w-28">
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            :
                                <Skeleton className="w-28 h-8 border" />
                            }
                        </li>
                        <li className="border-b border-border">
                            <form action={logout}>
                                <button className="hover:bg-background focus-visible:bg-background outline-none py-4 w-full text-start text-muted-foreground transition-colors">
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                :
                    <>
                        <Button asChild variant="outline" className="mt-4 w-full">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="mt-2 w-full">
                            <Link href="/signup">Sign up</Link>
                        </Button>
                    </>
                }
                <ul className="mt-8">
                    <li className="border-b border-border">
                        <Link href="/help" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                            Help
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                            Documentation
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}