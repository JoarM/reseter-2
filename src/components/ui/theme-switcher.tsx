"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

export default function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <menu className="rounded-full grid grid-flow-col p-1 border border-border">
                <li>
                    <Skeleton className="h-8 w-8 rounded-full box-content bg-secondary"/>
                </li>
                <li>
                    <Skeleton className="h-8 w-8 rounded-full box-content bg-secondary"/>
                </li>
                <li>
                    <Skeleton className="h-8 w-8 rounded-full box-content bg-secondary"/>
                </li>
            </menu>
        )   
    }

    return (
        <menu role="radiogroup" className="rounded-full grid grid-flow-col p-1 border border-border">
            <li>
                <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors aria-[checked='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("dark")}
                aria-checked={theme === "dark" ? "true" : "false"}
                >
                    <Moon className="w-4 h-4"/>
                    <span className="sr-only">Dark theme</span>
                </button>
            </li>
            <li>
                <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors aria-[checked='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("light")}
                aria-checked={theme === "dark" ? "true" : "false"}
                >
                    <Sun className="w-4 h-4"/>
                    <span className="sr-only">Light theme</span>
                </button>
            </li>
            <li>
                <button 
                role="radio" 
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors aria-[checked='true']:bg-foreground/5 aria-[current='true']:text-foreground/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background outline-none"
                onClick={() => setTheme("system")}
                aria-checked={theme === "dark" ? "true" : "false"}
                >
                    <Monitor className="w-4 h-4"/>
                    <span className="sr-only">System theme</span>
                </button>
            </li>
        </menu>
    )
}