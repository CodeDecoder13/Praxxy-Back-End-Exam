<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'category' => $this->faker->randomElement(['Electronics', 'Clothing', 'Books', 'Food', 'Furniture']),
            'description' => $this->faker->sentence,
            'date_and_time' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
