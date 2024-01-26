import { JoinForm } from "@/components/forms/join-form";
import { BackButton } from "@/components/ui/back-button";
import { invite } from "@/data/teams";

export default async function Invite({
    params
}: {
    params: {
        id: string;
    }
}) {
    const team = await invite(params.id);

    return (
        <div className="w-[1052px] max-w-full mx-auto px-6 pt-14">
            <BackButton 
            fallback="/dashboard"
            />

            {team ? 
                <div className="mt-16">
                    <h1 className="text-xl mb-4">You have been invited to join <strong>{team.name}</strong></h1>

                    <JoinForm
                    id={params.id}
                    />
                </div>
                :
                <div className="mt-16">
                    <h1 className="text-xl mb-4">There you dont have an invite to this team, make sure you are logged in to the right account</h1>
                </div>
            }
        </div>
    )
}