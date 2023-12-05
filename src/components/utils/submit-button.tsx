"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton({
    children,
    className
  }: {
    children: React.ReactNode,
    className?: string
  }) {
    const { pending } = useFormStatus();

    return (
        <Button className={className} disabled={pending}>
            {pending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            {children}
        </Button>
    )
}