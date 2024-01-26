import { EditTeamForm } from "@/components/forms/edit-team-form"
import { BackButton } from "@/components/ui/back-button"
import { getTeam } from "@/data/teams"
import { notFound } from "next/navigation"

export default async function edit({
    params
}: {
    params: {
        id: string
    }
}) {
    const team = await getTeam(params.id);

    if (!team) return notFound();

    return (
        <div className="w-[1052px] max-w-full mx-auto px-6">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-16">
                <EditTeamForm 
                teamId={params.id}
                name={team.name}
                description={team.description}
                />
            </div>
        </div>
    )
}