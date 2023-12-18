import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";
import { CostChart } from "@/components/utils/cost-chart";
import { UsageChart } from "@/components/utils/usage-chart";
import { getProject } from "@/data/projects"
import { getPriceMultiplier } from "@/lib/utils";
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
    let sum = 0;
    const priceFormatter = new Intl.NumberFormat('en-uk', {
        style: 'currency',
        currency: 'eur',
    });

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
            "requests": rawUsage[i]
        });
    }

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
        price.unshift({
            date: formatedDate,
            tooltip: longDate,
            "cost": rawUsage[i] * getPriceMultiplier(rawUsage[i]),
        });
        sum += rawUsage[i] * getPriceMultiplier(rawUsage[i]);
    }

    return (
        <>
            <Card className="mt-14">
                <CardHeader>
                    <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <UsageChart 
                    usage={usage}
                    />

                    <noscript>
                        <ul className="divide-y divide-border/50">
                            {usage.map((obj) => 
                                <li key={obj.date} className="py-2">
                                    <div className="text-xs font-normal text-muted-foreground">{obj.tooltip}</div>
                                    <div className="text-sm font-medium mt-1">Requests: <span className="text-primary">{obj.requests}</span></div>
                                </li>
                            )}
                        </ul>
                    </noscript>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Cost</CardTitle>
                    <span className="font-medium text-lg text-foreground">{priceFormatter.format(sum)}</span>
                </CardHeader>
                <CardContent>
                    <CostChart 
                    cost={price}
                    />

                    <noscript>
                        <ul className="divide-y divide-border/50">
                            {price.map((obj) => 
                                <li key={obj.date} className="py-2">
                                    <div className="text-xs font-normal text-muted-foreground">{obj.tooltip}</div>
                                    <div className="text-sm font-medium mt-1">Cost: <span className="text-primary">{priceFormatter.format(obj.cost)}</span></div>
                                </li>
                            )}
                        </ul>
                    </noscript>
                </CardContent>
            </Card>
        </>
    )
}