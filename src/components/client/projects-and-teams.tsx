"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Folder, Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ProjectsAndTeams({ 
    projects,
    teams
}: {
    projects?: {
        id: number;
        name: string;
        description: string | null;
        usage: unknown;
        secret: string;
    }[],
    teams?: {
        id: number;
        name: string;
        description: string | null;
    }[]
}) {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="mt-12 flex gap-2">
                <div className="relative w-full">
                    <Search className="absolute text-muted-foreground left-3 top-3" size={16} />
                    <Input role="search" className="pl-8" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Button asChild variant="secondary">
                    <Link href="/dashboard/create">
                        <Plus size={16} className="sm:mr-2" />
                        <span className="hidden sm:inline">Create new</span>
                    </Link>
                </Button>
            </div>
            <noscript className="text-destructive mt-1 text-sm font-medium">You need to enable Javascript to use the search functionality</noscript>

            <h2 className="text-xl font-medium mt-6">Projects</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                {projects === undefined ? 
                <span>No projects, create one to get started</span>
                : 
                <>
                    {projects.map((project) => {
                        if (project.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <Link href={`/project/${project.id}`} key={project.id} className="group outline-none hover:scale-105 transition-transform ease-in">
                                    <Card className="h-40 flex flex-col justify-between group-hover:border-foreground group-hover:bg-muted/25 group-focus-visible:ring-2 ring-offset-2 ring-offset-background ring-foreground transition-colors">
                                        <div>
                                            <CardHeader>
                                                <CardTitle>{project.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{project.description}</CardDescription>
                                            </CardContent>
                                        </div>
                                        
                                        <CardFooter>
                                            <Folder size={16} className="text-muted-foreground ml-auto mr-2"/>
                                            <span className="text-muted-foreground font-light text-xs">Project</span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        } else {
                            return null;
                        }
                    })}
                </>
                }
            </div>
             
            <h2 className="mt-6 text-xl font-medium">Teams</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4">
                {teams != undefined && 
                <>
                    {teams.map((team) => {
                        if (team.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <Link href={`/team/${team.id}`} key={team.id} className="group outline-none hover:scale-105 transition-transform ease-in">
                                <Card className="h-40 flex flex-col justify-between group-hover:border-foreground group-hover:bg-muted/25 group-focus-visible:ring-2 ring-offset-2 ring-offset-background ring-foreground transition-colors">
                                        <div>
                                            <CardHeader>
                                                <CardTitle>{team.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{team.description}</CardDescription>
                                            </CardContent>
                                        </div>
                                        
                                        <CardFooter>
                                            <Users size={16} className="text-muted-foreground ml-auto mr-2"/>
                                            <span className="text-muted-foreground font-light text-xs">Team</span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            )
                        } else {
                            return null;
                        }
                    })}
                </>
                }
            </div> 
        </>
    )
}