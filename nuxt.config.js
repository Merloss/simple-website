export default {
  head: {
    title: 'Merloss',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'Merloss',
        content: 'Learn more about me',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  colorMode: {
    classSuffix: '',
  },

  css: [],

  plugins: [
    {
      src: '@/plugins/VueLanyard.js',
      mode: 'client',
    },

    {
      src: '@/plugins/tippy.js',
      mode: 'client',
    },
    {
      src: '@plugins/animxyz.js',
      mode: 'client',
    },
  ],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/svg', '@nuxtjs/color-mode'],

  modules: ['@nuxtjs/axios'],

  axios: {},

  build: {},

  tailwindcss: {
    viewer: false,
  },
}
