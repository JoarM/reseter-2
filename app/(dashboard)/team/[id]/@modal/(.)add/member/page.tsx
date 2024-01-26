import { InviteMemberForm } from "@/components/forms/invite-member-form"
import Modal from "@/components/ui/modal"

export default function InviteMemberModal({
    params
}: {
    params: {
        id: string,
    }
}) {
    return (
        <Modal>
            <InviteMemberForm
            id={params.id}
            />
        </Modal>
    )
}