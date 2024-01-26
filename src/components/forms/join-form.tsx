"use client";

import { joinTeam } from "@/actions/team";
import { useFormState } from "react-dom";
import { SubmitButton } from "../ui/submit-button";

export function JoinForm({
    id
}: {
    id: string
}) {
    const [form, joinAction] = useFormState(joinTeam, null);

    return (
        <form action={joinAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton>
                Join team
            </SubmitButton>
            {form?.error && 
                <p className="text-destructive text-sm font-medium mt-2">{form.error}</p>
            }
        </form>
    )
}