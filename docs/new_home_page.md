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

At this point it is impossible to continue without first registering and or logging into site. The inbuilt authorisation that is being provided by Laravel and Jetstream is really impressive and we will want to use it but we don't really want to put potential adoptees off looking for an animal to adopt by forcing them to have to register with the site and then login.

The vast majority of people that use are application will just be browsing and that experience needs to be made as easy as possible and also as fast as possible.

What this means is that we're going to have to provide a home page for the application that is welcoming and easy to use. We won't delete , as yet, what has been provided given that we know that we will require authorisation for certain features that we intend to provide but we will create a brand new home page for the app.

<br>

## A new home page

<br>

### Creating the layout

<br>

In the resources/js/Layouts folder create a new file MainLayout.vue

Truthfully the actual name is academic (the file extension however isn't) but as it's the intension to use this layout everywhere then MainLayout is at least self explanatory.

With that created scaffold ot the absolute basics.

<br>

```js
<script setup>
</script>

<template>
</template>
```

<br>
