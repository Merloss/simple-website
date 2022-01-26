<template>
  <div
    class="
      bg-gray-200
      dark:bg-gray-800 dark:text-white
      overflow-hidden
      transition
      duration-75
      dark:selection:bg-white/10
      selection:bg-black/10
    "
  >
    <Nuxt class="container mx-auto" />
    <navbar />
    <div class="bg-gray-400 dark:bg-gray-700 fixed bottom-0 w-full py-1" />
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