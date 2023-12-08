import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="w-[1052px] max-w-full mx-auto px-6 mt-12 flex gap-2">
            <div className="relative w-full">
                <Search className="absolute text-muted-foreground left-3 top-3" size={16} />
                <Input role="search" className="pl-8" placeholder="Search..." />
            </div>
            <Button asChild variant="secondary">
                <Link href="/dashboard/create">
                    <Plus size={16} className="mr-2" />
                    Create new
                </Link>
            </Button>
        </div>
    )
}