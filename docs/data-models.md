---
title: "Configuring the Data Models"
date: 2023-12-07
author: Dom Sinclair
avatar: https://avatars.githubusercontent.com/u/12199442
twitter: "@vuedesigner"
outline: deep
---

# Configuring the Data Models

If you've got to here then you will already have a working base application and a functional database.

Relational databases are ubiquitous these days. Very few applications or websites don't make use of data in some form or other so it behoves us to understand what we're dealing with.

A database is essentially a piece of software that can store information. That information is stored in tables and those tables can be linked to each (hence the term 'relational'). The term database itself is frequently interposed between description of the collection of tables storing the data we are interested in and the actual engine that performs the operations that Create, Read, Update and Delete (CRUD) that data. Please try and bear that distinction in mind as you read these tutorials. We'll do our best to best to avoid confusion but context is everything.

Traditionally database operations involve opening a connection to the database, performing CRUD operations with SQL and then closing the connection. Keeping database connections open continually is a security risk so it is entirely possible that one could open and close a connection on multiple occasions to perform a given task.

SQL itself is also something of an arcane language. It remains the most efficient way to communicate with a database but it takes a skilled SQL practitioner to write truly efficient SQL.

To make the lives of developers easier the concept of the Object Relational Model was born. The tables in the database are 'described' in our code in the form of Models. In languages like Php and Typescript that are both object Oriented and Type safe we can then write code that does not allow our data Models to deviate from their original definition. Data validation becomes easier and in the process CRUD operations are less prone to failure.

There is a price to pay for this, isn't there always? The SQL that ORM's write is nowhere near as efficient as that written by a good SQL practitioner but for the average developer ORM's have made database interactions much much easier.

Laravel has it's own ORM and our project is already in a position to use it, so with that in mind let's start to create some of the Data Models we are going to need.

<br>

## The First Model

<br>

There are a series of things that we need to do for each data model we create.

- Create and define the model itself.
- Create a migration for the model (this is what will create the table in our database).
- Create the means by which we can perform CRUD operations.
- Generate some fake data for use during development.

We said at the start that we were going to create a listings site that would allow rescue organisations to list animals that they had so that potential adoptees could approach them with a view to adopting.

That immediately tells us that we will need a model to represent the animals and one to represent the rescue centres.

Let's start with the animals. By convention the table name in the database will be pluralised (Animals) but the model will be singular (Animal).

<br>

### A word about tooling

<br>

Code is essentially nothing more than text. We could, quite literally write everything in Notepad. [Notepad++](https://notepad-plus-plus.org/) and [Sublime Text](https://www.sublimetext.com/) are two popular enhancements over Notepad for writing code files , not least because they have a degree of language and syntax support. VSCode is a lot beteer in that you also gain from some intellisense that is type safe aware. As free option go the latter is your best bet but you'll still have to write a lot of code manually. PhpStorm is going to provide you with a lot of code refactorings and templates. Once you become familiar with it it may almost appear that the code is writing itself. However we are now into the realms of paid for products. If you are going to be doing a lot of this then then it may be an investment that will provide you with a quick return. [Here's](https://laracasts.com/series/phpstorm-for-laravel-developers) another free series that will give you an insight into what PhpStorm has to offer. It will also introduce you to Laravel Idea which adds another layer of code completion to your armoury.

With our first data model we'll cover using both VSCode and PhpStorm. If you are a good touch typist and really familiar with Php then feel free to use Notepad++ or sublime text but if you're not you'll have a better experience in VSCode or PhpStorm.

<br>

### Creating the basic model in VSCode

<br>

At the terminal in VSCode we can run the following command.

`php artisan make:model Animal -mfsc`

This will generate five basic classes;

A Model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;
}
```

A Factory

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        ];
    }
}
```

A Migration

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
```

A Seeder

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnimalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
    }
}
```

And finally a Controller

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    //
}

```

This is a reasonably comprehensive start but there is still a lot of additional code that we will need to create and some of it will be without the benefits of type safety.

<br>

### Creating the basic model in PhpStorm (with Laravel Idea)

Now we're going to do much the same only this time using PhpStorm (with the plugin Laravel Idea installed). Whilst these are paid for products you can get a thirty day trial for both so it ought to be possible for you to try these for free.

We created an Animal Model and associated classes but what sort of animals are we talking about? It's going to be a listings site where rescue societies can list the animals they have for adoption. Initially the idea was that this would be for dogs only however lets broaden that a bit and give ourselves some options.

One way to do this would be to have a field in the Animal model called AnimalType into which the type of animal would be added when a new animal was added. Whilst this would work it relies on everyone who enters an animal record to use exactly the same AnimalType definitions, which they might not.

We could add an AnimalType enumeration to the animal model. That would solve the problem we've just alluded to but could prove to be limiting. If the end users of the application wanted additional values adding to the enum they would have to contact the developers.

Let's add a reference table (in database parlance) that will contain Animal Types and to which it will be easy for the end users to add additional types in the future.

Open up the project in PhpStorm, navigate to the Laravel menu (if you haven't got one then you have installed Laravel Idea).

<br>

![New Eloquent Model](images/datamodels1.jpg)

<br>

Select 'New Eloquent Model'.

<br>

![New Eloquent Model Dialog](images/datamodel2.jpg)

<br>

Our Model name is going to be AnimalType.

We'll add a Name field (which can be the default type of string) and we'll add an AnimalId field of type BigInteger which will reference the Animals table. In that way end users will ce able to select and animal type (say dog or cat) and see which animals that fall into that type are currently available for adoption.

Here is our completed dialog.

<br>

![New Eloquent Model Dialog Filled In](images/datamodels3.jpg)

<br>

You can see the name we've applied to the Model (and what the table name will be in the database).

We have a Name field which is perfectly ok with the default data type of string.

We have also checked the various additional bits we want to be created.

Once we click ok this is what we end up with:

The Model

<br>

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animal_Type extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'Name',
    ];
}
```

<br>

The Migration

<br>

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('animal__types', function (Blueprint $table) {
            $table->id();
            $table->string('Name');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animal__types');
    }
};
```

<br>

The Factory

<br>

```php
<?php

namespace Database\Factories;

use App\Models\Animal_Type;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class Animal_TypeFactory extends Factory
{
    protected $model = Animal_Type::class;

    public function definition(): array
    {
        return [
            'Name' => $this->faker->name(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
```

<br>

The Request

<br>

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Animal_TypeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'Name' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
```

<br>

and the Policy

<br>

```php
<?php

namespace App\Policies;

use App\Models\Animal_Type;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class Animal_TypePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {

    }

    public function view(User $user, Animal_Type $animal_Type): bool
    {
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Animal_Type $animal_Type): bool
    {
    }

    public function delete(User $user, Animal_Type $animal_Type): bool
    {
    }

    public function restore(User $user, Animal_Type $animal_Type): bool
    {
    }

    public function forceDelete(User $user, Animal_Type $animal_Type): bool
    {
    }
}
```

<br>

### What's the difference

<br>

On first glance possible not that much but underneath we've achieved a lot more in PhpStorm. The biggest this is the chance to add the fields we want to our Model, which in turns means that our migration file is more complete along with the factory. Additionally, as we are about to discover, creating the relationship between the AnimalType and Animals table is going to become a lot easier.

<br>

### Creating Relationships between Models

Relationships are what makes a relational database so understanding what they are and how to create them is crucial.

The main Laravel documentation on the Eloquent ORM has an [excellent section on relationships](https://laravel.com/docs/10.x/eloquent-relationships#polymorphic-relationships) which we would urge to read before proceeding further. For the time being we'll be concentrating mainly on one to many relationships but we'd suggest bookmarking the documentation link for future reference.

If you've read the documentation section you'll now know that we need to create relationship functions in our respective models, and add foreign id links in the migrations.

As things currently stand we have an AnimalType model which could have many related records in the Animal Model. Let's now see how PhpStorm and Laravel Idea make creating this relationship very much easier.

<br>

### Naming Conventions

<br>

Before going any further it would make a great deal of sense to read the following blog post on [Namining conventions in Laravel](https://webdevetc.com/blog/laravel-naming-conventions/). Pay particular attention to the section on tables. If you follow the naming conventions then Laravel Idea will prove to be way more useful to you as you are about to see.

### The One to Many Relationship

<br>

In PhpStorm open up the animal migration and in the
` Schema::create('animals', function (Blueprint $table)` add the following line.

` $table->foreignId('animal_type_id');`

When you go on to run `php artisan migrate` this will add a foreign key to the animals table that links back to the animal_types table. Once you've done that be sure to go the the Laravel menu on the main toolbar and click 'Generate Helper Code'.

In a one to many relationship we could say that an Animal 'belongsTo' an AnimalType and that an AnimalType 'hasMany' animals.

In the respective models we will need to create functions that represent this. Fortunately (assuming that you have added the relevant entry in the animals migration) Laravel Idea is about to make this really easy for us.

Open up the Animal Model and within the body of the class type 'belongs'.

<br>

![Belongs To Refactoring](images/belongsto.gif)

<br>

As you can see Laravel Idea is smart enough to pick up the fact that this is going to ,ost likely be a belongsTo relationship with the AnimalType and accordingly offers that as its first suggestion. as soon as you select it you'll have the necessary function.

Once you've done that navigate to the AnimalType Model and this time just type hasMany and you'll be presented with the option to create a hasMany function for the Animal table.

This is just one example of how PhpStorm combined with Laravel Idea can really speed up your development.

<br>

## Exercise Time

Take some time to read the main Laravel Documentation on [Database Migrations](https://laravel.com/docs/10.x/migrations) and then when you've done that consider the diagram below.

<br>

![Database Diagram](images/datamodels4.jpg)

<br>

In the diagram are three tables, AnimalTypes, Animals and RescueCentres. They are all inter related. Those fields that are followed by NN are fields that should not be empty (in other words they should always have a value). The others are Nullable (they could contain a null value).

By default Laravel migrations will automatically create the pk (primary key) field and the create_at and updated_at fields so you can ignore those.

With those points in mind experiment at creating the relevant models and migrations. Use the fork of the initial branch to get started. Don't worry if you make mistakes you can always start over. The main purpose of the exercise is for you to become familiar with creating models and migrations in whatever environment you have available to work in.
