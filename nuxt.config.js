export default {
  target: 'static',
  ssr: false,
  generate: {
    fallback: true,
  },
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
        name: 'description',
        content:
          '19 years old Turkish student, studying in Computer Programming and I try to learn new things every day in order to improve myself.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  colorMode: {
    classSuffix: '',
  },

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

  modules: ['@nuxtjs/pwa'],

  tailwindcss: {
    viewer: false,
  },
}
