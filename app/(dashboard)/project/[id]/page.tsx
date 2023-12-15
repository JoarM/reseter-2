import { getProject } from "@/data/projects"
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Project({ 
    params
} : { 
    params: { 
        id: string 
    } 
}) {
    const project = await getProject(params.id);

    if (!project) {
        return notFound();
    }

    return (
        <></>
    )
}