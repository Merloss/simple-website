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
        spotifyStatus === true ? `background-color: ${technology[1]}10` : ''
      "
      v-for="(technology, key) in technologies"
      :key="technology"
      :title="technology[0]"
    >
      <icon
        class="self-center w-4 h-4 mr-2 md:w-auto md:mr-0 xl:mr-2 xl:flex-shrink-0"
        :class="{
          'md:h-16  xl:w-16 ': spotifyStatus === true,
          'md:h-6  xl:w-6': spotifyStatus === false,
        }"
        :name="key"
      />
      <span class="self-center md:hidden xl:block">
        {{ technology[0] }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  props: ["spotifyStatus"],
  data() {
    return {
      technologies: {
        javascript: ["JavaScript", "#f7df1e"],
        python: ["Python", "#3572A5"],
        html: ["HTML5", "#E34F26"],
        css: ["CSS3", "#3faede"],
        tailwind: ["TailwindCSS", "#2FA7FF"],
        nuxt: ["NuxtJS", "#00dc82"],
        vue: ["VueJS", "#41B883"],
        nodejs: ["NodeJS", "#0F9D58"],
        firebase: ["Firebase", "#FFC107"],
      },
    };
  },
};
</script>
