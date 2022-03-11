<template>
  <nav
    class="
      md:w-full
      w-full
      p-3
      fixed
      top-0
      inset-x-0
      mx-auto
      flex-shrink-0
      backdrop-blur-xl
      transition-colors
      duration-200
      md:backdrop-blur-0
    "
    :class="scroll > 10 ? 'bg-[#040b1b50]' : 'bg-transparent'"
  >
    <div class="flex justify-between items-center container mx-auto">
      <NuxtLink to="/" class="text-2xl dark:text-gray-200">Kerim</NuxtLink>

      <button
        @click="switchTheme"
        class="
          p-2
          transition
          duration-150
          bg-gray-300
          dark:bg-gray-900
          text-gray-500
          rounded-md
          focus:ring-2 focus:ring-gray-400
          dark:focus:ring-gray-500
        "
      >
        <icon
          name="moon"
          id="themeIcon"
          v-if="$colorMode.value == 'light'"
          class="h-5 w-5"
        />
        <icon name="sun" id="themeIcon" v-else class="h-5 w-5 text-gray-200" />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      scroll: null,
    }
  },
  methods: {
    switchTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === 'dark' ? 'light' : 'dark'
    },
    updateScroll() {
      this.scroll = window.scrollY
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
}
</script>
