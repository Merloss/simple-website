import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: "static",
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/pwa"],
    colorMode: { classSuffix: "" },
    meta: {
        title: 'Merloss',
        htmlAttrs: {
            lang: 'en',
        },

        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pwa: {
        meta: {
            title: 'Merloss',
            description:
                '19 years old Turkish student, studying in Computer Programming and I try to learn new things every day in order to improve myself.',
        },
        manifest: {
            name: 'Merloss',
            short_name: 'Merloss',
            lang: 'en',
        },
    },
});
