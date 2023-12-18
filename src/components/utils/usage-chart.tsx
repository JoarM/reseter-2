"use client";

import LineChart from "../ui/line-chart";

export function UsageChart({
    usage
}: {
    usage: any[]
}) {
    return (
        <LineChart
        data={usage}
        categories={["requests"]}
        index="date"
        className='text-sm font-medium'
        />
    )
}