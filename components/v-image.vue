<template>
  <div>
    <skeleton :class="class" v-if="loading || !imageLoaded" />
    <img v-show="imageLoaded && !loading" class="xyz-in" xyz="fade"
      :class="{ invisible: imageLoaded == false, [this.class]: true }" @load="imageLoaded = true" :src="src"
      :draggable="draggable" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['src', 'loading', 'draggable', 'class'],
  data() {
    return {
      imageLoaded: false,
    }
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
