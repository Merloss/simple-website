<template>
  <a :href="getUtmLink" target="_blank">
    <slot />
  </a>
</template>

<script setup lang="ts">
const props = defineProps(['href'])

const getUtmLink = computed(() => {
  const url = new URL(props.href)
  url.searchParams.append('utm_source', window.location.host)
  return url.href
})
</script>

