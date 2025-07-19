<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\Option;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
        $validated['starts_at'] = Carbon::parse($request->validated()['starts_at'])->setTimezone("Asia/Jakarta")->format('Y-m-d H:i:s');
        $validated['ends_at'] = Carbon::parse($request->validated()['ends_at'])->setTimezone("Asia/Jakarta")->format('Y-m-d H:i:s');

        $event = Event::create([
            'title' => $validated['title'],
            'isClosed' => $validated['isClosed'],
            'starts_at' => $validated['starts_at'],
            'ends_at' => $validated['ends_at']
        ]);

        foreach ($validated['options'] as $option) {
            Option::create([
                'event_id' => $event->id,
                'option' => $option['option']
            ]);
        }

        return redirect()->route('events.index')->with('success_toast', [
            'message' => 'Event created successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with(['options.event'])->where('id', '=', $id)->first();
        $optionIds = [];
        foreach ($event->options as $option) {
            $optionIds[] = $option->id;
        }
        $userVote = Vote::where('user_id', '=', Auth::id())->whereIn('option_id', $optionIds)->first();
        if ($userVote) {
            return redirect()->route('events.index')->with('error_toast', [
                'message' => 'Already vote. Cannot vote twice',
            ]);
        }

        return Inertia::render('events/show', [
            'event' => $event
        ]);
    }

    public function detail(string $id)
    {
        $event = Event::with(['options'])->where('id', '=', $id)->first();

        return Inertia::render('events/detail', [
            'event' => $event
        ]);
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
