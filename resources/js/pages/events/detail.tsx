import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export const description = 'A bar chart with a custom label';

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)',
    },
    label: {
        color: 'var(--background)',
    },
} satisfies ChartConfig;

interface Option {
    id: number;
    option: string;
    votes: number;
}

interface Event {
    id: number;
    title: string;
    isClosed: boolean;
    starts_at: string;
    ends_at: string;
    options: Option[];
}

interface Props {
    event: Event;
}

export default function DetailEvent({ event }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Bar Chart - Custom Label</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={event.options}
                                layout="vertical"
                                margin={{
                                    right: 16,
                                }}
                            >
                                <CartesianGrid horizontal={false} />
                                <YAxis
                                    dataKey="option"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                    hide
                                />
                                <XAxis dataKey="votes" type="number" hide />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Bar dataKey="votes" layout="vertical" fill="var(--color-desktop)" radius={4}>
                                    <LabelList dataKey="votes" position="insideLeft" offset={8} className="fill-(--color-label)" fontSize={12} />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
