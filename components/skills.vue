<template>
  <section
    class="grid items-center flex-shrink-0 w-full gap-2 text-center truncate select-none md:grid-cols-3 md:gap-4 mb-7"
    xyz="fade small stagger"
  >
    <div
      class="flex content-center p-3 text-sm font-semibold transition duration-75 rounded-md dark:bg-transparent dark:hover:bg-white/10 hover:bg-gray-400 md:text-base xyz-in"
      :class="{
        ' md:p-5 md:flex-col': spotifyStatus === true,
      }"
      :style="
        spotifyStatus === true ? `background-color: ${technology.color}10` : ''
      "
      v-for="(technology, key) in techStack"
      :key="key"
      :title="technology.name"
    >
      <Icon
        class="self-center w-6 h-6 md:w-auto mr-2 xl:flex-shrink-0"
        :class="{
          'md:h-16 xl:w-16 md:mr-0': spotifyStatus === true,
          'md:h-8 xl:w-8': spotifyStatus === false,
        }"
        :name="technology.icon"
      />
      <Link
        :href="technology.url"
        class="self-center md:hidden xl:block hover:underline"
      >
        {{ technology.name }}
      </Link>
    </div>
  </section>
</template>

<script setup lang="ts">
import Link from "@/components/link.vue";
import { techStack } from "@/utils/composables/techStack";
const { spotifyStatus } = defineProps(["spotifyStatus"]);
</script>
