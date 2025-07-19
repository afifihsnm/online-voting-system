<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Carbon\Carbon;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('events/index', [
            'events' => Event::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();
        dd($validated);
        $validated['starts_at'] = Carbon::parse($request->validated()['starts_at'])->setTimezone("Asia/Jakarta")->format('Y-m-d H:i:s');
        $validated['ends_at'] = Carbon::parse($request->validated()['ends_at'])->setTimezone("Asia/Jakarta")->format('Y-m-d H:i:s');

        $student = Event::create($validated);

        return redirect()->route('events.index')->with('success', 'Student created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with(['options'])->where('id', '=', $id)->first();

        return Inertia::render('events/show', [
            'event' => $event
        ]);
    }

    public function detail(string $id)
    {
        $event = Event::with(['options'])->where('id', '=', $id)->first();

        // return Inertia::render('events/show', [
        //     'event' => $event
        // ]);

        return Inertia::render('events/detail', [
            'event' => $event
        ]);
    }

    public function test()
    {
        return Inertia::render('events/test');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }
}
