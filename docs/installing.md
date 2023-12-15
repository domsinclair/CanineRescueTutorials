# Installing The Code

<br>

There are two choices open to you for this next step.

In some respects the simplest is going to be cloning the repository. That will be setup to just work.

You may however decide to have a little more intervention at this stage and learn what it is possible to do. The choice is yours and the options are laid out below.

<br>

## Laravel / Inertia

<br>

### Repository Clone

<br>

The repository to clone is located here

<br>

### The Manual Approach

<br>

Create a batch file that looks like this:

```
@echo off
echo Creating a new Laravel app.
set /p input= What is the name of your app
echo App is: %input%
pause
set currentdir=%CD%
composer create-project laravel/laravel %input% --prefer-dist && cd "%currentdir%\%input%" && composer require laravel/jetstream & php artisan jetstream:install inertia --ssr --dark & npm install & npm install -D tailwindcss@latest postcss@latest autoprefixer@latest  @tailwindcss/typography@latest @tailwindcss/forms@latest & npm install @pinegrow/vite-plugin@latest -D & npm install @pinegrow/tailwindcss-plugin@latest -D & npm run build  & code ./ & npm run dev & exit 0
```

Make sure that it's saved on the system path.

Open a terminal in the directory where you normally keep your projects and execute the batch file.

> <strong>NB Mac users can create a bash file to do the same and it may be possible to do a simple copy paste when creating it.</strong>

Once that batch file has finished you should have VSCode open at your newly created project.

Substitute the contents of the vite.config.js file with the code below;

<br>

```js
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { liveDesigner } from "@pinegrow/vite-plugin";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    liveDesigner({
      tailwindcss: {
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        configPath: "tailwind.config.js",
        cssPath: "resources/css/app.css",
        // themePath: false, // Set to false so that Design Panel is not used
        // restartOnConfigUpdate: true,
        restartOnThemeUpdate: true,
      },
      //...
      devServerUrls: {
        local: "http://127.0.0.1:8000",
      },
      dirs: {
        src: "resources/js/",
        layouts: "resources/js/Layouts",
        pages: "resources/js/Pages",
        components: "resources/js/Components",
      },
      startupPage: "@/Pages/Welcome.vue",
    }),
    laravel({
      input: "resources/js/app.js",
      ssr: "resources/js/ssr.js",
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      /* Must be either an object, or an array of { find, replacement, customResolver } pairs. */
      /* Refer to: https://vitejs.dev/config/shared-options.html#resolve-alias */
      /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
      "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
      "~": fileURLToPath(new URL("./resources/js", import.meta.url)),
      "~~": fileURLToPath(new URL("./resources", import.meta.url)),
    },
  },
});
```

<br>

Now substitute the contents of the tailwind.config.js file with the code below;

<br>

````js
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./vendor/laravel/jetstream/**/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
        "./index.html",
        "./_pginfo/**/*.{html,js}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        require("@pinegrow/tailwindcss-plugin").default,
        forms,
        typography,
    ],
};

<br>

Open the .env file and swap ou the Database section so that it looks like this;

<br>

```env
DB_CONNECTION=sqlite
DB_FOREIGN_KEYS=true
````

<br>

With that done save the project and run the following three commands;

```
php artisan migrate
php artisan serve
npm run dev
```

> If at this stage you meet an error along these lines; could not find driver (SQL: PRAGMA foreign_keys = ON;) then type the following command into the terminal
>
> <br>
>
> ```bash
> php --ini
> ```
>
> <br>
>
> This will tell you exactly where your php.ini file is located. Navigate to and open that file and search it to find this line.
>
> `;extension=pdo_sqlite`
>
> Uncomment the line by removing the semi colon at the start and save the file.

Open up Vue Designer. Once open select Open Project and navigate to the folder where your newly created project resides and open it. In a few moments once Vue Designer has recognised everything you should see an 'Open Startup Page' in the main browser window. Click it and you should be presented with the following;

<br>

![Welcome Screen](images/installation1.jpg)

<br>

Congratulations you good to go.
