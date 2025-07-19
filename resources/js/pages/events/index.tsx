import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Event {
    id: number;
    title: string;
    isClosed: boolean;
    starts_at: string;
    ends_at: string;
}

interface Props {
    events: Event[];
}

export default function IndexEvent({ events }: Props) {
    console.log(events);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href="events/create">
                    <Button>Create Event</Button>
                </Link>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>isClosed</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell className="font-medium">{event.id}</TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.isClosed}</TableCell>
                                <TableCell>{event.starts_at}</TableCell>
                                <TableCell>{event.ends_at}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <Link href={`events/detail/${event.id}`}>
                                        <Button>View</Button>
                                    </Link>
                                    <Link href={`events/${event.id}`}>
                                        <Button variant='outline'>Vote</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
