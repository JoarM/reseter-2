import { Button } from "@/components/ui/button";
import { getApiKeys } from "@/data/projects"
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ApiKeys({ 
    params
} : { 
    params: { 
        id: string 
    } 
}) {
    const apikeys = await getApiKeys(params.id);

    return (
        <>
            <div className="px-2 h-16 flex items-center justify-between">
                <h1 className="text-lg font-medium">Api keys</h1>
                <Button asChild>
                    <Link href={`/project/${params.id}/api-keys/create`}>
                        <Plus
                        className="mr-2"
                        size={16}
                        />
                        New api key
                    </Link>
                </Button>
            </div>

            <ul>
                {apikeys && apikeys.length > 0 ? 
                    <>
                        {apikeys.map(({name, key}) => 
                            <li className="px-2 h-16 flex items-center justify-between border-b first:border-t border-border" key={key}>
                                <span className="font-medium text-base">{name}</span>
                                <span>•••••••••••••••</span>
                            </li>
                        )}
                    </>
                :
                    <span className="text-sm font-medium px-2 mt-1">No api keys for this project. Create one to get started</span>
                }
            </ul>
        </>
    )
}