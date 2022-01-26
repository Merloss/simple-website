<template>
  <a :href="getUtmLink"><slot /></a>
</template>

<script>
export default {
  props: ['href'],
  computed: {
    getUtmLink() {
      try {
        const url = new URL(this.href)
        url.searchParams.append('utm_source', 'erigg')
        return url.href
      } catch (err) {
        return this.href
      }
    },
  },
}
</script>
