"use client";

import { Save, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "../ui/submit-button";
import { useFormState } from "react-dom";
import { deleteTeam, editTeam } from "@/actions/team";
import { useRouter } from "next/navigation";

export function EditTeamForm({
    teamId,
    name,
    description
}: {
    teamId: string,
    name: string,
    description: string | null
}) {
    const [deleteState, deleteAction] = useFormState(deleteTeam, undefined);
    const [form, editAction] = useFormState(editTeam, undefined);
    const router = useRouter();
    function onSubmit() {
        router.back();
    }

    return (
        <form action={editAction} onSubmit={onSubmit} className="mx-auto max-w-sm w-full">
            <h2 className="font-medium text-lg">Edit team</h2>

            <Label className="block mt-4" htmlFor="name">Name</Label>
            <Input className="mt-2" id="name" name="name" defaultValue={name} />
            {form?.error?.name &&
                <span className="text-sm font-medium text-destructive mt-2 block">
                    {form.error.name}
                </span>
            }

            <Label className="block mt-4" htmlFor="description">Description</Label>
            <Textarea className="mt-2 resize-none" id="description" name="description" defaultValue={description ? description : ""} rows={4} maxLength={150} />
            {form?.error?.description &&
                <span className="text-sm font-medium text-destructive mt-2 block">
                    {form.error.description}
                </span>
            }
            <input type="hidden" name="id" value={teamId} />

            <div className="grid sm:grid-cols-2 gap-2 mt-6">
                <SubmitButton>
                    <Save 
                    className="mr-2"
                    size={16}
                    />
                    Save
                </SubmitButton>
                <SubmitButton variant="destructive" formAction={deleteAction}>
                    <Trash2
                    className="mr-2"
                    size={16}
                    />
                    Delete
                </SubmitButton>
            </div>
            {deleteState?.message && 
                <span className="text-sm font-medium text-destructive mt-2 block">
                    {deleteState.message}
                </span>
            }
            {form?.message &&
                <span className="text-sm font-medium text-destructive mt-2 block">
                    {form.message}
                </span>
            }
        </form>
    )
}