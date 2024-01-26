import { BackButton } from "@/components/ui/back-button";
import { EditProjectForm } from "@/components/forms/edit-project-form";
import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function EditProject({
    params
}: {
    params: {
        id: string,
    }
}) {
    const project = await getProject(params.id);

    if (!project) return notFound();

    return (
        <div className="w-[1052px] max-w-full mx-auto px-6">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-16">
                <EditProjectForm 
                projectId={params.id}
                name={project.name}
                description={project.description}
                />
            </div>
        </div>
    );
}