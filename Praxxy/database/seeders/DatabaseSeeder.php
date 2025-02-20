<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'User One',
            'email' => 'user1@example.com',
            'password' => Hash::make('password1'),
        ]);

        User::create([
            'name' => 'User Two',
            'email' => 'user2@example.com',
            'password' => Hash::make('password2'),
        ]);

        User::create([
            'name' => 'User Three',
            'email' => 'user3@example.com',
            'password' => Hash::make('password3'),
        ]);
    }
}
