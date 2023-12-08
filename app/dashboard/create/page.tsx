import { BackButton } from "@/components/utils/back-button";
import { CreateForm } from "@/components/utils/create-form";

export default function create() {
    return (
        <div className="w-[1440px] max-w-full mx-auto px-8 mt-12">
            <BackButton 
            fallback="/dashboard"
            />

            <div className="mt-24">
                <CreateForm />
            </div>
        </div>
    )
}