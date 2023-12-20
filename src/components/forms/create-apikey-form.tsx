"use client";

import { create } from "@/actions/dashboard/create";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";

export function CreateApikeyForm({
    projectId
}: {
    projectId: string
}) {
    const [form, createAction] = useFormState(create, undefined);

    return (
        <form action={createAction} className="mx-auto max-w-sm w-full">
            <h2 className="font-medium text-lg">Add api key</h2>

            <Label className="block mt-4" htmlFor="name">Key name</Label>
            <Input className="mt-2" id="name" name="name" />
            {form?.error?.name && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.name}</span>}
            <input type="hidden" value={projectId} name="id"/>

            <SubmitButton className="mt-6 w-full">
                <Plus
                className="mr-2"
                size={16}
                />
                Create
            </SubmitButton>
            {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}
        </form>
    )
}