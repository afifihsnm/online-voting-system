import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type StudentForm = {
    title: string;
    isClosed: boolean;
    starts_at: Date;
    ends_at: Date;
    options: Option[];
};

type Option = {
    option: string;
}

export default function CreateEvent() {
    const [option, setOption] = useState('');
    const [options, setOptions] = useState<Option[]>([]);

    const { data, setData, post, errors, processing } = useForm<Required<StudentForm>>({
        title: '',
        isClosed: false,
        starts_at: new Date(),
        ends_at: new Date(),
        options: []
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('events.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            autoComplete="title"
                            placeholder="Title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="starts_at">Start At</Label>

                        <DateTimePicker
                            value={data.starts_at}
                            onChange={(date) => setData('starts_at', date ? date : new Date())}
                            className="w-[280px]"
                        />

                        <InputError className="mt-2" message={errors.starts_at} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="ends_at">Email address</Label>

                        <DateTimePicker
                            value={data.ends_at}
                            onChange={(date) => setData('ends_at', date ? date : new Date())}
                            className="w-[280px]"
                        />

                        <InputError className="mt-2" message={errors.ends_at} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="isClosed">Event Status</Label>

                        <div className="flex items-center gap-3">
                            {/* <Checkbox id="isClosed" /> */}
                            <Switch id="isClosed" />
                            <Label htmlFor="isClosed">Closed</Label>
                        </div>

                        <InputError className="mt-2" message={errors.isClosed} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="options">Options</Label>

                        <Input
                            id="options"
                            className="mt-1 block w-full"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                            // required
                            autoComplete="title"
                            placeholder="Title"
                        />

                        <InputError className="mt-2" message={errors.options} />

                        {options.map((option) => (
                            <p>{option.option}</p>
                        ))}

                        <Button
                            type="button"
                            onClick={() => {
                                if (option) {
                                    setOptions([...options, { option: option }]);
                                    setOption('');
                                    setData('options', [...options, { option: option }])
                                }
                            }}
                            className='w-[100px]'
                        >
                            Add option
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Submit</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
