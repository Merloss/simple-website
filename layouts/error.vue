<template>
  <div class="container mx-auto min-h-screen relative pt-24">
    <span
      class="
        md:text-[400px]
        z-0
        md:block
        hidden
        absolute
        inset-x-0
        text-center
        select-none
        bottom-0
        opacity-30
      "
      >{{ error.statusCode }}</span
    >
    <div
      class="
        flex
        md:justify-between
        mt-24
        z-10
        md:flex-row
        justify-center
        flex-col
      "
    >
      <v-image
        v-tippy="{ content: `probably i can't help you` }"
        class="h-64 w-64 md:h-64 md:w-64 self-center mb-8 md:mb-0 rounded-lg"
        :src="getImageUrl()"
      />
      <div :title="error.message" class="mx-4 md:mx-0">
        <span class="text-xl">Hmm, this shouldn't be the case.</span>
        <pre
          class="
            whitespace-pre-line
            max-w-3xl
            dark:bg-black/50
            bg-black/80
            text-white
            rounded-md
            py-6
            px-16
            mt-2
          "
        >
        <code>
          {{ JSON.stringify(error, null, 2) }}
        </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      image: [
        'https://c.tenor.com/qNWDwUcqjVAAAAAC/parkinson-cat-cat-parkinson.gif',
        'https://c.tenor.com/y_05wOrS5yoAAAAC/cats-doing-laundry.gif',
        'https://c.tenor.com/CRsjcTan2zQAAAAS/dancing-goose-dancing-duck-meme.gif',
        'https://c.tenor.com/aCKlfwxgr_8AAAAS/scream-meme.gif',
        'https://c.tenor.com/B4y0NWRM4EQAAAAC/lost-kermit.gif',
        'https://c.tenor.com/Hipi6wGslLkAAAAC/out-disappear.gif',
        'https://c.tenor.com/ppqVQB1PoBAAAAAC/tom-y-jerry-tom-and-jerry.gif',
        'https://c.tenor.com/4VY0Ykn4lN4AAAAd/cat-broken-cat.gif',
      ],
    }
  },
  methods: {
    getImageUrl() {
      return this.image[Math.floor(Math.random() * this.image.length)]
    },
  },
}
</script>

