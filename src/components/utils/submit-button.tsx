"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../ui/button";

export function SubmitButton({children, ...props} : ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button {...props} disabled={pending}>
            {pending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            {children}
        </Button>
    )
}