"use client";

import { LineChart, Card, Title } from '@tremor/react';

export function UsageChart({
    usage
}: {
    usage: any[]
}) {
    return (
        <Card className='mt-8'>
            <Title className='mb-2'>Usage</Title>
            <LineChart
            data={usage}
            categories={["usage"]}
            index="date"
            className='mt-4 h-80 text-sm font-medium'
            yAxisWidth={40}
            />
        </Card>
    )
}