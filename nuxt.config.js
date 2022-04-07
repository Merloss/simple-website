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

  tailwindcss: {
    viewer: false,
  },
  telemetry: true,
}
