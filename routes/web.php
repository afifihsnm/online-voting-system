<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Telegram\Bot\Laravel\Facades\Telegram;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('events', [EventController::class, 'index'])->name('events.index');
Route::get('events/create', [EventController::class, 'create'])->name('events.create');
Route::get('events/{id}', [EventController::class, 'show'])->name('events.show');
Route::post('events', [EventController::class, 'store'])->name('events.store');
Route::get('events/detail/{id}', [EventController::class, 'detail'])->name('events.detail');

Route::post('vote', [VoteController::class, 'store'])->name('vote.store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
