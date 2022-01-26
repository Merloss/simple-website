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
    "
    xyz="fade small stagger"
  >
    <div
      class="
        bg-gray-300
        hover:bg-gray-400
        dark:bg-gray-700 dark:hover:bg-gray-600
        rounded-md
        p-3
        flex
        font-semibold
        md:text-base
        text-xs
        content-center
        truncate
        xyz-in
      "
      v-for="(technology, key) in technologies"
      :key="technology"
    >
      <icon
        class="md:h-6 md:w-6 h-4 w-4 mr-2 self-center flex-shrink-0"
        :name="key"
      />
      {{ technology }}
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

