"use client";

import { contact } from "@/actions/contact";
import { SubmitButton } from "../ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";

export default function ContactForm() {
    const [form, contactAction] = useFormState(contact, undefined);

    return (
        <form action={contactAction} className="border border-border rounded-xl max-w-lg mx-auto mt-8 px-6 py-8">
            <Label htmlFor="email" className="block">Email</Label>
            <Input className="mt-2" name="email" id="email" />
            {form?.error?.email && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.email}</span>}

            <Label className="mt-4 block" htmlFor="name">Name</Label>
            <Input className="mt-2" name="name" id="name" />
            {form?.error?.name && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.name}</span>}

            <Label className="mt-4 block" htmlFor="message">Your message</Label>
            <Textarea className="mt-2 resize-none" name="message" id="message" rows={4} maxLength={200} />
            {form?.error?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.message}</span>}

            <SubmitButton className="mt-5">Send message</SubmitButton>
            {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}
            {form?.success && 
                <span className="text-sm font-medium text-primary mt-2 block">
                    Thank you for your message we will get back to you as soon as possible
                </span>
            }
        </form>
    )
}