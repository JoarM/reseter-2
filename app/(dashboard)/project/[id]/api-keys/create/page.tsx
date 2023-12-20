import { BackButton } from "@/components/ui/back-button";
import { EditProjectForm } from "@/components/forms/edit-project-form";
import { CreateApikeyForm } from "@/components/forms/create-apikey-form";

export default function CreateApikey({
    params
}: {
    params: {
        id: string,
    }
}) {
    return (
        <div className="w-[1052px] max-w-full mx-auto px-6">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-24">
                <CreateApikeyForm
                projectId={params.id}
                />
            </div>
        </div>
    );
}