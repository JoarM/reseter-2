import { EditTeamForm } from "@/components/forms/edit-team-form";
import Modal from "@/components/ui/modal";
import { getTeam } from "@/data/teams";
import { notFound } from "next/navigation";

export default async function EditModal({
    params
}: {
    params: {
        id: string,
    }
}) {
    const team = await getTeam(params.id);

    if (!team) return notFound();

    return (
        <Modal>
            <EditTeamForm
            teamId={params.id}
            name={team.name}
            description={team.description}
            />
        </Modal>
    )
}