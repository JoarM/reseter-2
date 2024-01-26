import { AddProjectForm } from "@/components/forms/add-project-form"
import { BackButton } from "@/components/ui/back-button"
import { getProjects } from "@/data/projects"
import { getTeam } from "@/data/teams"

export default async function addProject({
    params
}: {
    params: {
        id: string
    }
}) {
    const projects = await getProjects();
    const team = await getTeam(params.id);

    return (
        <div className="w-[1052px] max-w-full mx-auto px-6">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-16">
                <AddProjectForm
                projects={projects}
                teamId={params.id}
                teamProjects={team?.projects}
                />
            </div>
        </div>
    )
}