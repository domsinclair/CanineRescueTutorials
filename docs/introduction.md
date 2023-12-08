---
title: 'Introduction'
date: 2023-12-06
author: Dom Sinclair
avatar: https://avatars.githubusercontent.com/u/12199442
twitter: '@vuedesigner'
---

# Introduction

This app is intended to demonstrate the creation form start to a given finishing point the means by which a full stack application can be put together. It's a simulation of a potential animal rescue listings site.

the concept of a listings site was chosen ostensibly because they are becoming ever more popular and they provide immense scope to explore different avenues. Animal rescue was chosen as the subject matter because it's something that most people will probably be familiar with, it's an area in which one can generate an immense amount of fake data without any real fear of stepping on anyone's toes and there are a plethora of copyright free images out there.

When the tutorial has been completed it should hopefully have introduced a wide variety of programming concepts, some of which may or may not be familiar, that will both inspire and help you in your own endeavours.

It is also, obviously, intended to show off some of the reasons as to why you'd want to use Vue Designer to help accomplish the job.

The tutorial can be found on Github (insert link here). The main branch represents the current working model of the application and each branch represents a stage in the development cycle. You could start by forking 'Initial' which represents the initial commit with the basic application structure configured to use SQLite as a database.

<br>

## The stack

The application at the outset uses Laravel, Jetsream, Inertia and Vue.js with Tailwind and SQLite. As it develops and other pieces may be required then they will be introduced at the appropriate time.

In addition to [Vue Designer](https://vuedesigner.com/) you'll require [VSCode](https://code.visualstudio.com/) and or [PhpStorm](https://www.jetbrains.com/phpstorm/) (ideally with the [Laravel Idea](https://laravel-idea.com/) extension). You'll also need a tool to examine and interact with the SQLite database. We're going to suggest [DB Browser for SQLite](https://github.com/sqlitebrowser/sqlitebrowser/releases/tag/v3.12.2) for the simple reason that there are versions available for both windows and Mac which makes it easy to produce consistent material for these tutorials.

PhpStorm and Laravel Idea are paid for products (although both have a free 30 trial which ought to be enough to complete this series of tutorials).

<br>

## The Idea

We'll be creating a listings site to which animal rescue organisations can apply to be listed, so there will be the need for an administrative part of the app which will probably have it's own dashboard.

Each rescue society can stick with a basic listing which will be very basic in nature (probably little more than a name and address) or they can opt for a more comprehensive listing which would give them the opportunity to promote certain of their animals (possibly by way of blog posts).

End users coming to the site to look for an animal to rescue should be able to carry out a comprehensive search that should effectively narrow the choice down to the most suitable animal or animals that would best fit in with their circumstances.

We'll also be looking at introducing payments to the app. In truth this will be more for the purposes of demonstration rather than a specific requirement but it will allow for the coverage of a very common requirement, namely online payments.

Testing will also be looked at. It remains a good idea to have tests for your code to ensure that it actually does what you designed it to do.

Finally we will go on to cover deployment.

> Not all of this will be 100% Vue Designer centric, it is after all a full stack application but the intention is to demonstrate how view designer can become a useful addition to your toolstack when creating full stack apps.

<br>

## Getting Started

Fork the Initial Branch from the repository.

You will need to create an env file ( it actually needs to be called .env ) for which you can use the .env.example as a baseplate. You will however need to substitute this section

```lang=js
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

with this

```
DB_CONNECTION=sqlite
DB_FOREIGN_KEYS=true
```

Now in a terminal window run

<br>

`php artisan migrate`

<br>

You will be asked if you want to create the sqlite database, to which you need to type yes.

If at this stage you meet an error along these lines; could not find driver (SQL: PRAGMA foreign_keys = ON;) then type the following command into the terminal

<br>

```
php --ini
```

<br>

This will tell you exactly where your php.ini file is located. Navigate to and open that file and search it to find this line.

`;extension=pdo_sqlite`

Uncomment the line by removing the semi colon at the start and save the file.

Run the php artisan migrate command again and the database should be created.

Now run the following two commands

<br>

```

php artisan serve
npm run dev

```

<br>

Switch to Vue Designer and open the folder that contains your project.

You should now be ready to follow along with the tutorials which you can do here (link to tutorials repository).
