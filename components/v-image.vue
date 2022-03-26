<template>
  <div>
    <skeleton :class="getClasses" v-if="loading || !imageLoaded" />
    <img
      v-show="imageLoaded && !loading"
      class="xyz-in"
      xyz="fade"
      :class="{ invisible: imageLoaded == false, [getClasses]: true }"
      @load="imageLoaded = true"
      :src="src"
      :draggable="draggable"
    />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['src', 'loading', 'draggable'],
  data() {
    return {
      imageLoaded: false,
    }
  },
  computed: {
    getClasses() {
      return this.$vnode?.data?.staticClass
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
