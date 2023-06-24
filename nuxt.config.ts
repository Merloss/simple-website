export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-icon",
  ],

  colorMode: { classSuffix: "" },
  tailwindcss: {
    viewer: false,
  },

  devtools: { enabled: true },
});
