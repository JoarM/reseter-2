import { BackButton } from "@/components/utils/back-button";
import { EditProjectForm } from "@/components/utils/edit-project-form";

export default function EditProject({
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

            <div className="mt-16">
                <EditProjectForm 
                projectId={params.id}
                />
            </div>
        </div>
    );
}