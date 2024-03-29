"use client";

import { create } from "@/actions/dashboard/create";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";

export function CreateForm() {
    const [form, createAction] = useFormState(create, undefined);
    const [type, setType] = useState("project");
    const router = useRouter();
    function onSubmit() {
        router.back();
    }

    function radioChange(e: ChangeEvent<HTMLInputElement>) {
        setType(e.target.value);
    }

    return (
        <form action={createAction} onSubmit={onSubmit} className="mx-auto max-w-sm w-full">
            <h2 className="font-medium text-lg">Create new project or team</h2>

            <Label className="block mt-4" htmlFor="name">Name</Label>
            <Input className="mt-2" id="name" name="name" />
            {form?.error?.name && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.name}</span>}

            <Label className="block mt-4" htmlFor="description">Description</Label>
            <Textarea className="mt-2 resize-none" id="description" name="description" rows={4} maxLength={150} />
            {form?.error?.description && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.description}</span>}

            <div className="flex gap-4 mt-4">
                <div className="flex gap-2">
                    <input checked={type === "project"} onChange={radioChange} type="radio" id="project" value="project" name="type" />
                    <Label htmlFor="project">Project</Label>
                </div>

                <div className="flex gap-2">
                    <input checked={type === "team"} onChange={radioChange} type="radio" id="team" value="team" name="type" />
                    <Label htmlFor="team">Team</Label>
                </div>
            </div>

            <SubmitButton className="mt-6 w-full">
                <Plus
                className="mr-2"
                size={16}
                />
                Create
            </SubmitButton>
            {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}
            {form?.success && 
                <span className="text-sm font-medium text-primary mt-2 block">
                    Success! Return to dashboard to access what you created.
                </span>
            }
        </form>
    )
}