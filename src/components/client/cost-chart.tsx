"use client";

import LineChart from "../ui/line-chart";

export function CostChart({
    cost
}: {
    cost: any[]
}) {
    const priceFormatter = new Intl.NumberFormat('en-uk', {
        style: 'currency',
        currency: 'eur',
    });

    return (
        <LineChart
        data={cost}
        categories={["cost"]}
        index="date"
        className='text-sm font-medium'
        valueFormatter={priceFormatter.format}
        />
    )
}