import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="w-[1052px] max-w-full mx-auto px-6 mt-12">
            <div className="relative">
                <Search className="absolute text-muted-foreground left-3 top-3" size={16} />
                <Input role="search" className="pl-8" placeholder="Search..." />
            </div>
            
        </div>
    )
}