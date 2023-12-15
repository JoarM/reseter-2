import ProjectSidebarTabs from "@/components/utils/project-siderbar-tabs";
import { getProject } from "@/data/projects";
import { Settings } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectLayout({ 
    params,
    props,
} : { 
    params: { 
        id: string;
    },
    props: {
        children: React.ReactNode;
        modal: React.ReactNode;
    } 
}) {
    const project = await getProject(params.id);

    if (!project) {
        return notFound();
    }

    return (
        <>
            <aside className="absolute left-0 bottom-0 top-20 w-64 bg-muted border-r border-border/50 p-2">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">{project.name}</h1>
                    <Link 
                    href={`/project/${params.id}/edit`} 
                    className="ml-2 group focus-visible:ring-2 ring-offset-2 ring-ring ring-offset-muted outline-none rounded">
                        <Settings size={20} className="group-hover:rotate-180 transition-transform ease-in duration-300"/>
                    </Link>
                </div>
                <ProjectSidebarTabs projectId={params.id} />
            </aside>
        </>
    )
}