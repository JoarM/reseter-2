import { InviteMemberForm } from "@/components/forms/invite-member-form"
import { BackButton } from "@/components/ui/back-button"

export default function InviteMember({
    params
}: {
    params: {
        id: string
    }
}) {
    return (
        <div className="w-[1052px] max-w-full mx-auto px-6">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-16">
                <InviteMemberForm
                id={params.id}
                />
            </div>
        </div>
    )
}