<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Option;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $tests = Event::factory(5)->create();
        // dd($tests[0]->id);
        foreach ($tests as $test) {
            Option::create([
                'event_id' => $test->id,
                'option' => 'Pilih 1',
                'votes' => 15
            ]);
            Option::create([
                'event_id' => $test->id,
                'option' => 'Pilih 2',
                'votes' => 25
            ]);
            Option::create([
                'event_id' => $test->id,
                'option' => 'Pilih 3',
                'votes' => 35
            ]);
        }

        // for ($i=0; $i < 5; $i++) {
        //     Event::create([
        //         'title' => 'Event ' . $i,
        //         'isClosed' => false
        //     ]);
        // }
    }
}
