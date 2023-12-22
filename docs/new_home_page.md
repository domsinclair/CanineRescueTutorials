---
title: "A New Home Page"
date: 2023-12-22
author: Dom Sinclair
outline: deep
---

# A New Home Page

<br>

Now that the PrimeVue components have been installed let's set about creating a new home page for our application.

As we consider what we're going to do let's remind ourselves about what the application is meant to be doing. We're creating a listings based site that can be used by animal rescue centres to list those animals that they have available for fostering or adoption.

Rescue centre staff will need to be able to log into the site in order to list their available animals (and of course de-list those for whom they find suitable homes). Potential adopters just need to be able to view the site and browse for animals that they might want to foster or adopt. Lastly we must make provision for the site administrators who need to make sure that everything is running as it should.

Three very different roles, of which at least two will be using the same basic site layout.

As you will recall we have included Jetstream in the mix because of oll the benefits that a ready made authorisation package bring to the table but it does mean that we will need to weave our requirements into what the basic app provides.

To form the basis of an idea of what we're going to do we first need to establish what we currently have.

<br>

## Examining the basic application

<br>

Open up the application in Vue designer.

> Remember to run the comands `php artisan serve` and `npm run dev` first.

It should open up on the welcome page.

<br>

![Welcome Page](images/installation1.jpg)

<br>
