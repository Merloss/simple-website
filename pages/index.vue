<template>
  <div class="flex flex-col min-h-screen text-lg transition duration-150">
    <div
      class="
        flex flex-col
        sm:flex-row
        w-full
        pt-24
        md:pt-0
        justify-between
        md:mt-48
        items-center
      "
    >
      <div class="flex mx-8 md:mx-0 flex-col md:space-y-3 md:w-7/12">
        <div class="relative">
          <v-image
            class="rounded-xl h-28 w-28 md:h-48 md:w-48 relative"
            :loading="getLoading"
            :src="`https://cdn.discordapp.com/avatars/${getInfo.userId}/${getInfo.userAvatar}.png?size=1024`"
            draggable="false"
            alt="avatar"
          />
          <div
            v-tippy="{ content: getInfo.statusIndicator.toUpperCase() }"
            class="
              rounded-full
              h-3
              w-3
              absolute
              top-1
              left-1
              transition
              animate-pulse
              hidden
              md:block
            "
            :class="{
              'bg-[#3ba55d]': getInfo.statusIndicator === 'online',
              'bg-[#faa81a]': getInfo.statusIndicator === 'idle',
              'bg-[#ed4245]': getInfo.statusIndicator === 'dnd',
              'bg-[#747f8d]': getInfo.statusIndicator === 'offline',
            }"
          />
        </div>

        <div>
          <h1 class="md:text-5xl text-3xl flex my-2 xyz-in" xyz="fade left-2">
            Hello&nbsp;
            <icon
              name="wave"
              class="h-7 w-7 md:h-10 md:w-10 self-center animate-wavey"
            />
          </h1>

          <p
            class="md:w-7/12 text-md opacity-80 md:text-lg w-full xyz-in"
            xyz="fade left-4"
          >
            19 years old Turkish student, studying in Computer Programming and I
            try to learn new things every day in order to improve myself.
          </p>

          <p class="mt-4 md:text-xl xyz-in" xyz="fade left-4">Socials</p>
          <div class="flex text-xl space-x-3 mt-1 xyz-in">
            <Link
              :href="social"
              v-for="(social, key, index) in socials"
              :key="social"
            >
              <icon
                :name="key"
                class="
                  transition
                  duration-75
                  h-8
                  w-8
                  rounded-md
                  dark:hover:text-gray-300
                  hover:text-gray-500
                  xyz-in
                "
                :xyz="`fade down-${index + 1} delay-${index + 1}`"
              />
            </Link>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:w-4/12 w-10/12">
        <MusicCard class="block" />

        <span class="mt-6 mb-2 md:text-3xl xyz-in" xyz="fade left-4">
          Also tried these technologies & apps</span
        >

        <Skills class="flex-shrink-0" :spotifyStatus="spotifyLoading" />
      </div>
    </div>
    <Link
      href="https://github.com/Merloss/simple-website"
      class="
        xl:fixed xl:right-2 xl:bottom-0
        m-2
        place-self-end
        hover:underline
        md:text-base
        text-sm
        xyz-in
      "
      xyz="fade down-2 delay-30"
      >This website is open source!</Link
    >
  </div>
</template>

<script>
import icon from '~/components/icon.vue'
import skeleton from '~/components/skeleton.vue'
export default {
  components: { icon, skeleton },
  data() {
    return {
      lanyard: {},

      socials: {
        github: 'https://github.com/merloss',
        spotify: 'https://open.spotify.com/user/02q2yz8zr18lpb749ubxvphty',
        reddit: 'https://www.reddit.com/user/Merl0ss',
        discord: 'https://discord.com/users/489811754411491328',
        twitter: 'https://twitter.com/merl0ss',
      },
    }
  },

  computed: {
    getLoading() {
      return Object.keys(this.lanyard).length === 0
    },
    spotifyLoading() {
      return this.lanyard?.spotify === null
    },

    getInfo() {
      return {
        statusIndicator: this.lanyard?.discord_status || 'Offline',
        userId: this.lanyard?.discord_user?.id,
        userAvatar: this.lanyard?.discord_user?.avatar,
      }
    },
  },
  watch: {
    lanyard: {
      deep: true,
      handler(oldLanyard, newLanyard) {},
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
  },
}
</script>
