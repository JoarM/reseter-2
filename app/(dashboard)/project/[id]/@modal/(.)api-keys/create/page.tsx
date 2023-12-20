import { CreateApikeyForm } from "@/components/forms/create-apikey-form";
import Modal from "@/components/ui/modal";

export default function CreateApikeyModal({
    params
}: {
    params: {
        id: string,
    }
}) {
    return (
        <Modal>
            <CreateApikeyForm
            projectId={params.id}
            />
        </Modal>
    )
}