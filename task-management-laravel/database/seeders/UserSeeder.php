<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'demo',
            'name' => 'Demo User',
            'email' => 'demo@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}
