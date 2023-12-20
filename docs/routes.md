---
title: "Routes"
date: 2023-12-06
author: Dom Sinclair
outline: deep
---

# Routes

<br>

Having created some dummy data it would be nice to actually look at it. We could do that in the terminal with `php artisan tinker` but at the end of the day we're going to want to see it in our application anyway so let's make a simple start for which we will need to start playing with routes.

This is the point at which we will start to see significant differences between the approaches that need to be employed according to the stack that is being used.

<br>

## Laravel/Inertia

<br>

In our application the Welcome page is what we see initially and what determines that is the 'get' route in the web.php file;

<br>

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
```

<br>

> If you want to follow along at this stage fork the DataModelsAndMigrations branch from the repo to act as your starting point.

<br>

We're going to start initially by displaying a little of the dummy data that is in the database. To do that we'll need something to display it in, which in turn means that we need to turn our attention do getting some UI components.

The primary purpose behind this tutorial is to introduce the concept of designing full stack applications with the aid of Vue Designer. With that in mind using UI components from a paid for library was deemed to be a potentially restrictive factor and accordingly the decision was made to go with [PrimeVue](https://tailwind.primevue.org/).
