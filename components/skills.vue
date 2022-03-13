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
        hover:bg-gray-400
        transition
        duration-75
        dark:bg-transparent dark:hover:bg-white/10
        rounded-md
        p-3
        flex
        font-semibold
        md:text-base
        text-sm
        content-center
        truncate
        xyz-in
      "
      v-for="(technology, key) in technologies"
      :key="technology"
      :title="technology"
    >
      <icon
        class="
          md:h-6 md:w-auto
          xl:w-6
          h-4
          w-4
          md:mr-0
          xl:mr-2
          mr-2
          self-center
          xl:flex-shrink-0
        "
        :name="key"
      />
      <span class="md:hidden xl:block self-center">
        {{ technology }}
      </span>
    </div>
  </XyzTransitionGroup>
</template>

<script>
export default {
  data() {
    return {
      technologies: {
        javascript: 'JavaScript',
        python: 'Python',
        html: 'HTML5',
        css: 'CSS3',
        tailwind: 'Tailwind',
        figma: 'Figma',
        photoshop: 'Photoshop',
        'after-effects': 'After Effects',
        cinema4d: 'Cinema 4D',
      },
    }
  },
}
</script>

