import { UsageChart } from "@/components/utils/usage-chart";
import { getProject } from "@/data/projects"
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
    
    const rawUsage = JSON.parse(project.usage as string);
    let usage: any[] = [];
    let price: any[] = [];

    for (let i = 0; i < rawUsage.length; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formatedDate = date.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
        });
        usage.unshift({
            date: formatedDate,
            "usage": rawUsage[i]
        });
    }

    return (
        <>
            <UsageChart 
            usage={usage}
            />
        </>
    )
}