import { deleteApikey } from "@/actions/project";
import { CopyButton } from "@/components/client/copy-button";
import { Button } from "@/components/ui/button";
import { getApiKeys } from "@/data/projects"
import { Plus, Trash2 } from "lucide-react";
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
                            <li className="px-2 border-b first:border-t border-border flex items-center justify-between h-16" key={key}>
                                <span className="font-medium text-base">{name}</span>
                                <form action={deleteApikey} className="flex items-center">
                                    <CopyButton
                                    value={key}
                                    />
                                    <input type="password" className="bg-transparent text-sm font-medium w-96 text-right outline-none mr-2" tabIndex={-1} readOnly value={key} name="key" />
                                    <input type="hidden" value={params.id} name="projectId" />
                                    <Button variant="destructive" size="icon">
                                        <Trash2 
                                        size={16}
                                        />
                                        <span className="sr-only">Delete apikey</span>
                                    </Button>
                                </form>
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