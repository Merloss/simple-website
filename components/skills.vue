<template>
  <XyzTransitionGroup
    class="
      grid
      md:grid-cols-3
      w-full
      md:gap-4
      gap-2
      mb-7
      flex-shrink-0
      items-center
      text-center
      truncate
      select-none
    "
    xyz="fade small stagger"
  >
    <div
      class="
        dark:bg-transparent dark:hover:bg-white/10
        hover:bg-gray-400
        transition
        duration-75
        rounded-md
        flex
        p-3
        font-semibold
        text-sm
        md:text-base
        xyz-in
        content-center
      "
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
        class="
          md:w-auto
          h-4
          w-4
          md:mr-0
          xl:mr-2
          mr-2
          self-center
          xl:flex-shrink-0
        "
        :class="{
          'md:h-16  xl:w-16 ': spotifyStatus === true,
          'md:h-6  xl:w-6': spotifyStatus === false,
        }"
        :name="key"
      />
      <span class="md:hidden xl:block self-center">
        {{ technology[0] }}
      </span>
    </div>
  </XyzTransitionGroup>
</template>

<script>
export default {
  props: ['spotifyStatus'],
  data() {
    return {
      technologies: {
        javascript: ['JavaScript', '#f7df1e'],
        python: ['Python', '#3572A5'],
        html: ['HTML5', '#E34F26'],
        css: ['CSS3', '#3faede'],
        tailwind: ['Tailwind', '#2FA7FF'],
        figma: ['Figma', '#F24E1E'],
        photoshop: ['Photoshop', '#2e9ff3'],
        'after-effects': ['After Effects', '#00005b'],
        cinema4d: ['Cinema 4D', '#e0e0e0'],
      },
    }
  },
}
</script>

