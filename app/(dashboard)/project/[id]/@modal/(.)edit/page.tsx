import { EditProjectForm } from "@/components/forms/edit-project-form";
import Modal from "@/components/ui/modal";

export default function EditModal({
    params
}: {
    params: {
        id: string,
    }
}) {
    return (
        <Modal>
            <EditProjectForm
            projectId={params.id}
            />
        </Modal>
    )
}