import { ProjectSidebar } from "@/components/utils/project-siderbar";
import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function ProjectLayout(props: {
    children: React.ReactNode, 
    modal: React.ReactNode,
    params: {
        id: string,
    }
}) {
    const project = await getProject(props.params.id);

    if (!project) {
        return notFound();
    }

    return (
        <>
            <ProjectSidebar
            projectId={props.params.id}
            projectName={project.name}
            />

            <div className="absolute inset-0 left-14 lg:left-64 top-20">
                <main className="mx-auto max-w-3xl w-full px-6 pb-12">
                    {props.children}
                </main>
            </div>
            {props.modal}
        </>
    )
}