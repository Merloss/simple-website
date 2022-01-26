<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <svg v-if="name" v-html="require(`../assets/icons/${name}.svg?raw`)" />
</template>

<script>
export default {
  props: {
    name: { type: String, default: 'image' },
  },
}
</script>