import { EditProjectForm } from "@/components/utils/edit-project-form";
import Modal from "@/components/utils/modal";

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