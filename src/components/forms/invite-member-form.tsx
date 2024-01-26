"use client";

import { inviteMember } from "@/actions/team";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitButton } from "../ui/submit-button";
import { Send } from "lucide-react";

export function InviteMemberForm({
    id
}: {
    id: string;
}) {
    const [form, inviteMemberAction] = useFormState(inviteMember, null);

    return (
        <form action={inviteMemberAction} className="mx-auto max-w-sm w-full">
            <h1 className="font-medium text-lg">Invite member</h1>

            <Label htmlFor="email" className="block mt-6">Email</Label>
            <Input className="mt-2" id="email" name="email" />
            <input type="hidden" value={id} name="id" />
            <SubmitButton className="w-full mt-4">
                <Send
                className="mr-2"
                size={16}
                />
                Send invite
            </SubmitButton>
            {form?.error && 
                <p className="text-destructive text-sm font-medium mt-2">{form.error}</p>
            }
            {form?.success && 
                <p className="text-primary text-sm font-medium mt-2">{form.success}</p>
            }
        </form>
    )
}