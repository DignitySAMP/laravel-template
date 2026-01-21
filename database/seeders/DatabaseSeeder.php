<?php

namespace Database\Seeders;

use Spatie\Permission\PermissionRegistrar;
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
        // reset cached roles and permissions
        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
        // see https://spatie.be/docs/laravel-permission/v6/advanced-usage/seeding

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('test@example.com'),
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ]);
    }
}
