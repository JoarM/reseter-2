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
        <>
            <div className="fixed left-0 flex flex-col bottom-0 top-20 w-64 -translate-x-[200px] bg-muted border-r border-border/50 z-20 p-2 lg:translate-x-0 overflow-clip transition-transform aria-expanded:translate-x-0 group ease-in" aria-expanded={open}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">{projectName}</h1>
                    <Link 
                    href={`/project/${projectId}/edit`} 
                    className={"ml-2 w-10 h-10 inline-flex justify-center items-center group/settings focus-visible:ring-2 ring-offset-2 ring-ring ring-offset-muted outline-none rounded-md" + ` ${pathname === `/project/${projectId}/edit` && "bg-secondary/30"}`}>
                        <Settings size={20} className="group-hover/settings:rotate-180 transition-transform ease-in duration-300"/>
                    </Link>
                </div>
                <ul role="navigation">
                    <li>
                        <Link 
                        href={`/project/${projectId}`} 
                        className={"ml-auto flex items-center justify-center w-10 h-10 text-sm rounded-lg font-medium hover:bg-secondary/30 transition-colors focus-visible:ring-2 ring-ring outline-none " +
                        "lg:px-4 lg:rounded-full lg:justify-start lg:w-auto group-aria-expanded:px-4 group-aria-expanded:rounded-full group-aria-expanded:justify-start group-aria-expanded:w-auto "
                        + ` ${pathname === `/project/${projectId}` && "bg-secondary/30"}`}
                        >
                            <Home 
                            size={16}
                            className="lg:mr-2 group-aria-expanded:mr-2"
                            />
                            <span className="hidden lg:inline group-aria-expanded:inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href={`/project/${projectId}/api-keys`}
                        className={"ml-auto flex items-center justify-center w-10 h-10 text-sm rounded-lg font-medium hover:bg-secondary/30 transition-colors focus-visible:ring-2 ring-ring outline-none " +
                        "lg:px-4 lg:rounded-full lg:justify-start lg:w-auto group-aria-expanded:px-4 group-aria-expanded:rounded-full group-aria-expanded:justify-start group-aria-expanded:w-auto " 
                        + ` ${(pathname === `/project/${projectId}/api-keys` || pathname === `/project/${projectId}/api-keys/create`) && "bg-secondary/30"}`}
                        >
                            <KeyRound
                            size={16}
                            className="lg:mr-2 group-aria-expanded:mr-2"
                            />
                            <span className="hidden lg:inline group-aria-expanded:inline">Api keys</span>
                        </Link>
                    </li>
                </ul>
                <Button variant="secondary" size="icon" className="ml-auto mt-auto lg:hidden" onClick={() => setOpen(!open)}>
                    <ChevronRight 
                    size={16}
                    className="group-aria-[expanded=true]:rotate-180 transition-transform"
                    />
                </Button>
            </div>

            <div className="inset-0 z-10 bg-foreground/20 backdrop-blur-sm fixed invisible aria-[hidden=false]:visible transition-all lg:hidden" onClick={() => setOpen(false)} aria-hidden={!open}></div>
        </>
    )
}