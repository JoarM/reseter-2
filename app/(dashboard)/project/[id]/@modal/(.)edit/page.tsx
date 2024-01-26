import { EditProjectForm } from "@/components/forms/edit-project-form";
import Modal from "@/components/ui/modal";
import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function EditModal({
    params
}: {
    params: {
        id: string,
    }
}) {
    const project = await getProject(params.id);

    if (!project) return notFound();

    return (
        <Modal>
            <EditProjectForm
            projectId={params.id}
            name={project.name}
            description={project.description}
            />
        </Modal>
    )
}