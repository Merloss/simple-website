import '@animxyz/core'

import VueAnimXYZ from '@animxyz/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAnimXYZ)
})
