import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";
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
        const formatedDate = date.toLocaleDateString("en-uk", {
            month: "short",
            day: "numeric",
        });
        const longDate = date.toLocaleDateString("en-uk", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        usage.unshift({
            date: formatedDate,
            tooltip: longDate,
            "usage": rawUsage[i]
        });
    }

    return (
        <>
            <Card className="mt-14">
                <CardHeader>
                    <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart
                    data={usage}
                    categories={["usage"]}
                    index="date"
                    tooltipLabelIndex="tooltip"
                    className='text-sm font-medium h-72'
                    yAxisWidth={40}
                    />
                </CardContent>
            </Card>
            
        </>
    )
}