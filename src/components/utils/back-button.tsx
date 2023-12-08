"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function BackButton({
    fallback,
}: {
    fallback: string;
}) {
    const router = useRouter();

    function back() {
        router.back();
    }

    return (
        <Button variant="ghost" onClick={back}>
            <ChevronLeft size={16} className="mr-2" />
            Back
        </Button>
    )
}