"use client";

import { ChevronRight, Home, KeyRound, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";
import { Button } from "../ui/button";

export function ProjectSidebar({
    projectId,
    projectName
}: {
    projectId: string,
    projectName: string
}) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <aside className="fixed left-0 flex flex-col bottom-0 top-20 w-64 -translate-x-[200px] bg-muted border-r border-border/50 z-10 p-2 lg:translate-x-0 overflow-clip transition-transform aria-expanded:translate-x-0 group ease-in" aria-expanded={open}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">{projectName}</h1>
                <Link 
                href={`/project/${projectId}/edit`} 
                className="ml-2 group/settings focus-visible:ring-2 ring-offset-2 ring-ring ring-offset-muted outline-none rounded">
                    <Settings size={20} className="group-hover/settings:rotate-180 transition-transform ease-in duration-300"/>
                </Link>
            </div>
            <ul role="navigation">
                <li>
                    <Link 
                    href={`/project/${projectId}`} 
                    className={"flex items-center px-4 h-10 rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors focus-visible:ring-2 ring-ring outline-none" + ` ${pathname === `/project/${projectId}` && "bg-secondary/30"}`}
                    >
                        <Home 
                        size={16}
                        className="mr-2"
                        />
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                    href={`/project/${projectId}/api-keys`}
                    className={"flex items-center px-4 h-10 rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors focus-visible:ring-2 ring-ring outline-none" + ` ${pathname === `/project/${projectId}/api-keys` && "bg-secondary/30"}`}
                    >
                        <KeyRound
                        size={16}
                        className="mr-2"
                        />
                        Api keys
                    </Link>
                </li>
            </ul>
            <Button variant="secondary" size="icon" className="ml-auto mt-auto lg:hidden" onClick={() => setOpen(!open)}>
                <ChevronRight 
                size={16}
                className="group-aria-[expanded=true]:rotate-180 transition-transform"
                />
            </Button>
        </aside>
        
    )
}