import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Canine Rescue",
  description:
    "A full stack web application using Laravel, Inertia and Vue.js or Laravel and Nuxt",
  themeConfig: {
    // // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   {text: 'Home', link: '/'},
    //   {text: 'Examples', link: '/markdown-examples'},
    // ],

    sidebar: [
      {
        items: [
          { text: "Home", link: "/" },
          { text: "Introduction", link: "/introduction" },
          { text: "Installing The Code", link: "/installing" },
          { text: "Data Models", link: "/data-models" },
          { text: "Dummy Data", link: "/dummy-data" },
          { text: "Command Aliasing", link: "/aliasing" },
          { text: "Routes", link: "/routes" },
          { text: "Installing PrimeVue", link: "/primevue" },
          { text: "A New Home Page", link: "/new_home_page" },
          { text: "Eloquent ORM", link: "/eloquent" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/domsinclair/caninerescue" },
    ],
  },
});
