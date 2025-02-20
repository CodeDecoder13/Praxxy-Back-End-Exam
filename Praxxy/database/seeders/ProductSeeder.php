<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            Product::create([
                'name' => $faker->word,
                'category' => $faker->randomElement(['Electronics', 'Clothing', 'Books', 'Home', 'Food']),
                'description' => $faker->sentence,
                'date_and_time' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}