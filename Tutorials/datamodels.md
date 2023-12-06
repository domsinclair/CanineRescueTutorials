# Configuring the Data Models

- [Configuring the Data Models](#configuring-the-data-models)
  - [The First Model](#the-first-model)
    - [A word about tooling](#a-word-about-tooling)

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
