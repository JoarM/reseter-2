import { getTeam } from "@/data/teams";
import { notFound } from "next/navigation";

export default async function Team({
    params
}: {
    params: {
        id: string;
    }
}) {
    const team = await getTeam(params.id);

    if (!team) {
        return notFound();
    }

    return (
        <>{team.users?.displayname}</>
    )
}