<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->title(),
            'isClosed' => fake()->boolean(),
            'starts_at' => fake()->dateTimeBetween('-1 week', '+1 week'),
            'ends_at' => fake()->dateTimeBetween('-1 days', '+2 days'),
        ];
    }
}
