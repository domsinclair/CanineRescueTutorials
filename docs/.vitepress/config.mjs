import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Canine Rescue",
  description:
    "A full stack web application using Laravel, Inertia and Vue.js.",
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
          { text: "Data Models", link: "/data-models" },
          { text: "Dummy Data", link: "/dummy-data" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/domsinclair/caninerescue" },
    ],
  },
});
