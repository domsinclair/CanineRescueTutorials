---
title: "Dummy Data"
date: 2023-12-09
author: Dom Sinclair
outline: deep
---

# Dummy Data

Now that you've had the chance to experiment with creating data models and migrations (and quite possibly factories and controllers as well) it's time to look at how we can add some data into those tables to aid our development.

When our application is finally deployed the database itself will probably be empty of data or at least the vast majority of it will be. During the building phase though having mock data to use will be very beneficial. It will allow us to test the application thoroughly and it will also help when it comes to designing the views that are going to be used to both display and enter data.

Study this section carefully and make sure that you really understand the concepts. You'll be doing this a lot and it needs to become second nature.

<br>

## Common Php Commands

<br>

Before getting started lets familiarise ourselves with some of the basic php artisan commands that we'll find ourselves using most of the time in relation to migrations.

- `php artisan migrate`

This is the basic migration command that will, on the first occasion it's run also create the database for you.

- `php artisan db:seed`

This will seed your database with dummy data.

- `php artisan migrate:reset`

This will remove all of the migrations that have been made.

- `php artisan migrate:refresh`

migrate:refresh rolls back all of the migrations that have been made and then re runs php artisan migrate.

- `php artisan migrate:fresh`

This command drops all of the tables in the database, effectively leaving it empty and it will then go on to run the migrate command.

- `php artisan migrate:fresh --seed`

By adding --seed to the command the database tables created will be seeded with data.

In reality the last command may well be the one that gets used most often after the original php artisan migrate.

Whilst by no means a complete list these commands are almost certainly the ones that you will find yourself using the most often

<br>

## Seed - a definition

<br>

You will come across the word seed often in relation to databases and it generally refers to populating the database with fake data (usually for the purposes of testing and development).

That seeding is often done with the help of a special code library ([Faker](https://fakerphp.github.io/)) created specifically to make the job of creating fake 'realistic' data that bit easier.

The Faker library though also has it's own Seed definition. A Seed for Faker is a means by which it is possible to ensure that Faker always generates exactly the same 'realist' data for the database no matter how many times the tables are emptied and re-seeded. This is a particularly useful facility to use especially during development because it enables you to predict what results you should be seeing when you do certain things.

<br>

## Our First batch of dummy data

<br>

If you look in your app in the database folder you'll see a folder called seeders in which there is a single class DatabaseSeeder

<br>

```php
<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
```

If you look closely at the code that is commented out in the `run()` method you'll see reference to factory. Factories are what Laravel now uses as the main way to add fake data to tables. Indeed depending on how you chose to create your models for the exerciseat the end of the Data Models section you may well have created factories at the same time as you created the models.

Let's look at the User Factory created by default with your base application (it's in database/factories).

<br>

```php
<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'remember_token' => Str::random(10),
            'profile_photo_path' => null,
            'current_team_id' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    /**
     * Indicate that the user should have a personal team.
     */
    public function withPersonalTeam(callable $callback = null): static
    {
        if (! Features::hasTeamFeatures()) {
            return $this->state([]);
        }

        return $this->has(
            Team::factory()
                ->state(fn (array $attributes, User $user) => [
                    'name' => $user->name.'\'s Team',
                    'user_id' => $user->id,
                    'personal_team' => true,
                ])
                ->when(is_callable($callback), $callback),
            'ownedTeams'
        );
    }
}
```

<br>

Look at the code in the `definition()` unction and compare that with the actual User Model and you'll quickly see that the factory is being used to generate data to put into each user field.

Now uncomment this line in the run method of the DatabaseSeeder

` // \App\Models\User::factory(10)->create();`

When you've done that run the following command at the terminal;

<br>

`php artisan db:seed`

<br>

Open up the Sqlite database in DB Browser and look at Browse the data in the users table

You should see 10 entries. Make a note of the name in the first row.

Now run the following command at the terminal;

<br>

`php artisan migrate:fresh --seed`

Close the database in DB Browser (if it is still open) then reopen it and browse the data in the users table. You'll see 10 records again but they'll be completely different.

In most cases this probably wont matter but there will be occasions when having the same data really helps. Let's do something about that.

<br>

### Seeding the Faker

<br>

Return to the DatabaseSeeders file and amend it so that it now looks like this;

<br>

```php
<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Generator;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(Generator $faker): void
    {
        $faker->seed(100);
         \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
```

Save everything and then once again run the command

`php artisan migrate:fresh --seed`

Examine the users table once again, making a mental note of the entries.

Now run the command again, close DB Browser (if you hadn't already) reopen the it, open the database and browse the data in the users table. This time it will be the same as before.

You can now generate consistent random data time after time after time.
