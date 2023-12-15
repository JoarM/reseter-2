"use client";

import { Home, KeyRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function ProjectSidebarTabs({
    projectId,
}: {
    projectId: string
}) {
    const pathname = usePathname();

    return (
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
    )
}