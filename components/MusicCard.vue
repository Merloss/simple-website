<template>
  <skeleton class="w-[500px] h-48 rounded-md" v-if="getLoading" />

  <div v-else class="z-0">
    <div
      :style="`background-color: ${dominantColor}`"
      class="
        rounded-lg
        dark:bg-[#54616e]
        bg-gray-400
        font-extralight
        w-6/12
        md:w-auto
        xyz-in
        justify-between
        text-xs
        h-48
        md:max-w-xl md:text-md
      "
      xyz="fade"
    >
      <template>
        <div class="flex flex-col h-full px-4">
          <div class="flex gap-2 w-full h-full items-center truncate">
            <div class="flex-shrink-0">
              <v-image
                class="rounded-md h-24 md:h-32 md:w-32"
                draggable="false"
                :src="getImageUrl"
              />
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
              :class="getTextColor ? 'text-white' : 'text-black'"
            >
              <div class="space-y-1 overflow-hidden">
                <div class="truncate block">
                  <Link
                    :href="songForward()"
                    target="_blank"
                    v-tippy="{ content: 'Click to go song' }"
                    class="font-medium hover:underline truncate"
                    >{{ getStatus.song }}</Link
                  >
                </div>

                <span class="truncate block"
                  ><span class="font-thin">by</span>
                  {{ getStatus.artist }}</span
                >
                <span class="block"
                  ><span class="font-thin">on</span> {{ getStatus.album }}</span
                >
              </div>

              <div
                class="w-full mx-auto rounded-md h-1 transition-all"
                :class="getTextColor ? 'bg-white/40' : 'bg-black/30'"
              >
                <div
                  class="h-1 rounded-md transition-all"
                  :class="getTextColor ? 'bg-white' : 'bg-black'"
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
      songData: [],

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
        this.songData = []

        this.songData.push(
          this.lanyard?.spotify?.album_art_url,
          this.lanyard?.spotify?.song,
          this.lanyard?.spotify?.artist,
          this.lanyard?.spotify?.album,
          this.lanyard?.spotify?.track_id
        )
      }

      return (
        this.lanyard?.spotify?.album_art_url ||
        JSON.parse(localStorage.songData)[0]
      )
    },
    getTextColor() {
      return tinycolor(this.dominantColor).isDark()
    },

    getStatus() {
      return {
        statusIndicator: this.lanyard?.discord_status || 'Offline',
        song:
          this.lanyard?.spotify?.song || JSON.parse(localStorage.songData)[1],
        artist:
          this.lanyard?.spotify?.artist || JSON.parse(localStorage.songData)[2],
        album:
          this.lanyard?.spotify?.album || JSON.parse(localStorage.songData)[3],
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
    songData() {
      localStorage.songData = JSON.stringify(this.songData)
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
    if (!localStorage.songData)
      localStorage.songData = JSON.stringify(this.songData)
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
      return `https://open.spotify.com/track/${
        JSON.parse(localStorage.songData)[4]
      }`
    },
  },
}
</script>
