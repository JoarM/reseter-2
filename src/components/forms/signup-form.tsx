"use client";

import { signup } from "@/actions/user/signup";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../ui/submit-button";
import { useState } from "react";

export default function SignupForm() {
    const [form, signupAction] = useFormState(signup, undefined);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form action={signupAction} className="mx-auto sm:px-16 px-8 py-16 rounded-2xl border border-border max-w-lg mt-16">
            <h1 className="font-bold text-2xl">Sign up</h1>

            <Label className="mt-4 block" htmlFor="name">Display name</Label>
            <Input className="mt-2" id="name" name="name" />
            {form?.error?.displayname && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.displayname}</span>}

            <Label className="mt-4 block" htmlFor="mail">Email</Label>
            <Input className="mt-2" id="mail" name="mail" />
            {form?.error?.email && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.email}</span>}

            <Label className="mt-4 block" htmlFor="password">Password</Label>
            <Input className="mt-2" type={showPassword ? "text" : "password"} id="password" name="password" />
            {form?.error?.password && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.password}</span>}

            <div className="mt-4 flex gap-2 items-center">
                <Checkbox id="show-password" checked={showPassword} onClick={() => setShowPassword(!showPassword)} />
                <Label htmlFor="show-password" className="font-light">Show password</Label>
            </div>
            
            <SubmitButton className="mt-6 w-full">Sign up</SubmitButton>

            {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}

            <span className="font-medium text-sm block mt-3">
                Have an account? <Link href="/reset-password" className="font-medium text-sm text-primary underline-offset-4 hover:underline">Login</Link>
            </span>
        </form>
    )
}