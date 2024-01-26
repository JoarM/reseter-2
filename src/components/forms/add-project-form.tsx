"use client";

import { addProject, removeProject } from "@/actions/team";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Minus, Plus } from "lucide-react";
import { SubmitButton } from "../ui/submit-button";

export function AddProjectForm({
    projects,
    teamProjects,
    teamId
}: {
    projects?: {
        id: number;
        name: string;
        description: string | null;
        usage: unknown;
        secret: string;
    }[];
    teamProjects?: {
        id: number;
        name: string;
        description: string | null;
        usage: unknown;
        secret: string;
    }[];
    teamId: string;
}) {
    if (!projects) return <p>No projects to add</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add project</CardTitle>
            </CardHeader>
            <CardContent>
                {projects.map((project) => {
                    return (
                        <form action={teamProjects?.find(teamProject => teamProject.id === project.id) ? removeProject : addProject} className="border-b border-border px-2 py-3 first:border-t flex justify-between items-center" key={project.id}>
                            <span className="text-lg font-bold">{project.name}</span>
                            <input type="hidden" value={project.id} name="projectId" />
                            <input type="hidden" value={teamId} name="id" />
                            {teamProjects?.find(teamProject => teamProject.id === project.id) ?
                                <SubmitButton variant="destructive">
                                    <Minus
                                    className="mr-2"
                                    size={16}
                                    />
                                    Remove project
                                </SubmitButton>
                                :
                                <SubmitButton>
                                    <Plus
                                    size={16}
                                    className="mr-2"
                                    />
                                    Add project
                                </SubmitButton>
                            }
                        </form>
                    )
                })}
            </CardContent>
        </Card>
    )
}