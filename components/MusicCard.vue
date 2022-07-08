<template>
  <skeleton
    class="w-[500px] h-48 rounded-md hidden md:block"
    v-if="getLoading"
  />
  <div v-else-if="!getStatus.song" class="text-3xl" />

  <div v-else class="z-0">
    <div class="md:hidden flex my-2 items-center">
      <icon name="spotifyGreen" class="text-[#3ba55d] h-6 w-6 md:hidden" />
      <div class="text-xs">
        <span class="font-semibold"> {{ getStatus.song }} </span
        ><span class="font-thin">by</span>
        <span>{{ getStatus.artist }}</span>
      </div>
    </div>

    <div
      class="
        rounded-lg
        font-extralight
        md:w-auto
        xyz-in
        justify-between
        text-xs
        md:h-48 md:max-w-xl md:text-md
        hidden
        md:block
      "
      xyz="fade"
    >
      <template>
        <div class="flex flex-col md:h-full pr-4">
          <div class="flex gap-2 md:w-full items-center truncate">
            <div class="h-full w-72 hidden md:block">
              <div class="flex-shrink-0">
                <v-image
                  class="rounded-md h-full"
                  draggable="false"
                  :loading="getLoading"
                  :src="getImageUrl"
                />
              </div>
            </div>

            <div
              class="
                flex flex-col
                gap-2
                px-2
                md:text-xl
                w-full
                font-normal
                truncate
                overflow-hidden
              "
            >
              <div
                class="
                  space-y-1
                  overflow-hidden
                  flex
                  md:flex-col
                  space-x-4
                  my-2
                  md:my-0 md:space-x-0
                "
              >
                <div class="truncate">
                  <Link
                    :href="songForward()"
                    target="_blank"
                    v-tippy="{ content: 'Click to go song' }"
                    class="font-medium hover:underline md:truncate"
                    >{{ getStatus.song }}</Link
                  >
                </div>
                <span class="truncate"
                  ><span class="font-thin">by</span>
                  {{ getStatus.artist }}</span
                >
                <span
                  ><span class="font-thin">on</span> {{ getStatus.album.large_text }}</span
                >
              </div>

              <div
                class="
                  w-full
                  mx-auto
                  rounded-md
                  h-1
                  transition-all
                  dark:bg-white/40
                  bg-black/20
                "
              >
                <div
                  class="h-1 rounded-md transition-all dark:bg-white bg-black"
                  :style="`width: ${progress}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { prominent } from 'color.js'
import tinycolor from 'tinycolor2'
import skeleton from '~/components/skeleton.vue'

export default {
  components: { skeleton },
  data() {
    return {
      lanyard: {},
      dominantColor: '',

      rotate: {
        rotate: 360,
        backgroundColor: ['#2f495e', '#00c58e'],
        duration: 3000,
      },
      time: new Date().getTime(),
    }
  },
  computed: {
    getLoading() {
      return Object.keys(this.lanyard).length === 0
    },
    getImageUrl() {
      if (this.lanyard?.spotify?.album_art_url) {
        this.$store.commit('lanyard', this.dominantColor)
      }

      return this.lanyard?.spotify?.album_art_url
    },
    getTextColor() {
      return tinycolor(this.dominantColor).isDark()
    },

    getStatus() {
      return {
        statusIndicator: this.lanyard?.discord_status || 'Offline',
        song: this.lanyard?.spotify?.song,
        artist: this.lanyard?.spotify?.artist,
        album: this.lanyard?.spotify?.album,
        albumurl: this.lanyard?.spotify?.album_art_url,
        trackId: this.lanyard?.spotify?.track_id,
      }
    },
    progress() {
      const total =
        this.lanyard?.spotify?.timestamps?.end -
        this.lanyard?.spotify?.timestamps?.start
      const progress =
        100 -
        (100 * (this.lanyard?.spotify?.timestamps.end - this.time)) / total

      return progress
    },
  },

  watch: {
    lanyard: {
      deep: true,
      handler(oldLanyard, newLanyard) {
        if (
          oldLanyard?.spotify?.album_art_url !==
          newLanyard?.spotify?.album_art_url
        )
          return this.getColor()
      },
    },
  },

  async mounted() {
    const socket = await this.$lanyard({
      userId: '489811754411491328',
      socket: true,
    })

    socket.onmessage = ({ data }) => {
      const { d: status } = JSON.parse(data)
      this.lanyard = status
    }
    setInterval(() => {
      this.time = new Date().getTime()
    }, 500)
  },

  methods: {
    async getColor() {
      if (!this.lanyard?.spotify?.album_art_url) return

      const color = await prominent(this.lanyard?.spotify?.album_art_url, {
        format: 'hex',
        amount: 1,
      })

      this.dominantColor = color
    },
    songForward() {
      return `https://open.spotify.com/track/${this.getStatus.trackId}`
    },
  },
}
</script>
