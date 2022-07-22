<template>
  <component :is="dynamicComponent" />
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  props: {
    name: { type: String, default: "image" },
  },
  computed: {
    dynamicComponent() {
      const name = this.name;

      return defineAsyncComponent(() => import(`./icons/${name}.vue`));
    },
  },
};
</script>
