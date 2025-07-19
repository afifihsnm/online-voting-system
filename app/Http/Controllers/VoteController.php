<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Requests\UpdateVoteRequest;
use App\Models\Option;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

// use function Pest\Laravel\options;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoteRequest $request)
    {
        $validated = $request->validated();

        $result = Vote::create([
            'user_id' => Auth::id(),
            'option_id' => $validated['option_id']
        ]);

        if ($result) {
            $option = Option::find($validated['option_id']);
            Option::where('id', '=', $validated['option_id'])->update(['votes' => $option->votes + 1]);
        }
        return redirect()->route('events.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vote $vote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoteRequest $request, Vote $vote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vote $vote)
    {
        //
    }
}
