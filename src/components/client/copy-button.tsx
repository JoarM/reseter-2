"use client";

import { Copy } from "lucide-react";
import { Button } from "../ui/button";

export function CopyButton({
    value
}: {
    value: string
}) {
    return (
        <Button variant="ghost" size="icon" type="button" onClick={() => navigator.clipboard.writeText(value)}>
            <Copy
            size={16}
            />
            <span className="sr-only">Copy</span>
        </Button>
    )
}