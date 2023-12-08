import { BackButton } from "@/components/utils/back-button";
import { CreateForm } from "@/components/utils/create-form";

export default function create() {
    return (
        <div className="w-[1052px] max-w-full mx-auto px-6 mt-12">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-24">
                <CreateForm />
            </div>
        </div>
    )
}