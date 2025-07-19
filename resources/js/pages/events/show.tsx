import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export const description = 'A bar chart with a custom label';

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

type VoteForm = {
    option_id: number;
};

export default function ShowEvent({ event }: Props) {
    const { data, setData, post, errors, processing } = useForm<Required<VoteForm>>({
        option_id: event.options[0].id
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('vote.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Vote Option</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Card>
                            <form onSubmit={submit}>
                                <RadioGroup defaultValue={`${data.option_id}`} onValueChange={(value) => setData('option_id', parseInt(value))} className="px-4">
                                    {event.options.map((option) => (
                                        <Card className="px-4" key={option.id}>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value={`${option.id}`} id={`opt-${option.id}`} />
                                                <Label htmlFor={`opt-${option.id}`}>{option.option}</Label>
                                            </div>
                                        </Card>
                                    ))}
                                </RadioGroup>

                                <InputError className="mt-2" message={errors.option_id} />

                                <div className="flex items-center ml-4 mt-4">
                                    <Button disabled={processing}>Submit</Button>
                                </div>
                            </form>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
