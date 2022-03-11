<template>
  <div
    class="
      bg-gray-200
      dark:bg-[#070510] dark:text-white
      overflow-hidden
      transition-all
      duration-75
      dark:selection:bg-white/10
      selection:bg-black/10
    "
    :style="
      this.$colorMode.value == 'dark'
        ? `background-image: linear-gradient(to top left, #00000000,#00000000, ${this.$store.state.lanyard}40);`
        : ''
    "
  >
    <Nuxt class="container mx-auto justify-center sm:justify-start" />
    <navbar />
    <div class="bg-gray-400 dark:bg-[#130e2c] fixed bottom-0 w-full py-1" />
  </div>
</template>
<script>
export default {
  head() {
    return {
      htmlAttrs: {
        class: this.$colorMode.value,
      },
    }
  },
}
</script>
<style>
</style>