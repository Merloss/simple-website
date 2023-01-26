<template>
  <div
    class="bg-gray-200 dark:bg-[#070510] dark:text-white overflow-hidden transition duration-75 dark:selection:bg-white/10 selection:bg-black/10"
    :style="
      $colorMode.value == 'dark'
        ? `background-image: linear-gradient(to top left, #00000000,#00000000, ${store.gradientColor}40);`
        : ''
    "
  >
    <button
      @click="switchTheme"
      class="p-2 transition duration-150 bg-gray-300 dark:bg-gray-900 text-gray-500 rounded-md focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 absolute top-3 right-3"
    >
      <icon
        name="moon"
        id="themeIcon"
        v-if="$colorMode.value == 'light'"
        class="h-5 w-5"
      />
      <icon name="sun" id="themeIcon" v-else class="h-5 w-5 text-gray-200" />
    </button>
    <div
      class="container flex flex-col justify-center min-h-screen mx-auto text-lg transition duration-150 sm:justify-start"
    >
      <div
        class="flex flex-col items-center justify-between w-full pt-24 sm:flex-row md:pt-0 md:mt-48"
      >
        <div class="flex flex-col mx-8 md:mx-0 md:space-y-3 md:w-7/12">
          <div class="relative">
            <v-image
              class="relative rounded-xl h-28 w-28 md:h-48 md:w-48"
              :loading="getLoading"
              :src="`https://cdn.discordapp.com/avatars/${getInfo.userId}/${getInfo.userAvatar}.png?size=1024`"
              draggable="false"
              alt="avatar"
            />
            <div
              v-tooltip="getInfo.statusIndicator.toUpperCase()"
              class="absolute hidden w-3 h-3 transition rounded-full top-1 left-1 animate-pulse md:block"
              :class="{
                'bg-[#3ba55d]': getInfo.statusIndicator === 'online',
                'bg-[#faa81a]': getInfo.statusIndicator === 'idle',
                'bg-[#ed4245]': getInfo.statusIndicator === 'dnd',
                'bg-[#747f8d]': getInfo.statusIndicator === 'offline',
              }"
            />
          </div>

          <div>
            <h1 class="flex my-2 text-3xl md:text-5xl xyz-in" xyz="fade left-2">
              Hello&nbsp;
              <icon
                name="wave"
                class="self-center h-7 w-7 md:h-10 md:w-10 animate-wavey"
              />
            </h1>

            <p
              class="w-full md:w-7/12 text-md opacity-80 md:text-lg xyz-in"
              xyz="fade left-4"
            >
              {{ new Date().getUTCFullYear() - 2002 }} years old Turkish
              student, studying in Computer Programming and I try to learn new
              things every day in order to improve myself.
            </p>

            <p class="mt-4 md:text-xl xyz-in" xyz="fade left-4">Socials</p>
            <div class="flex mt-1 space-x-3 text-xl xyz-in">
              <Link
                v-for="(social, key, index) in socials"
                :key="social"
                :href="social"
              >
                <icon
                  :name="key"
                  class="w-8 h-8 transition duration-75 rounded-md dark:hover:text-gray-300 hover:text-gray-500 xyz-in"
                  :xyz="`fade down-${Number(index) + 1} delay-${
                    Number(index) + 1
                  }`"
                />
              </Link>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-10/12 md:w-4/12">
          <MusicCard class="block" />

          <span class="mt-6 mb-2 md:text-3xl xyz-in" xyz="fade left-4">
            Also tried these technologies & apps
          </span>

          <Skills class="flex-shrink-0" :spotifyStatus="spotifyLoading" />
        </div>
      </div>
      <Link
        href="https://github.com/Merloss/simple-website"
        class="m-2 text-sm xl:fixed xl:right-2 xl:bottom-0 place-self-end hover:underline md:text-base xyz-in"
        xyz="fade down-2 delay-30"
        >This website is open source!</Link
      >
    </div>
    <div class="bg-gray-400 dark:bg-[#130e2c] fixed bottom-0 w-full py-1" />
  </div>
</template>

<script lang="ts">
import { prominent } from "color.js";
import { useLanyard } from "@leonardssh/use-lanyard";
import { useLanyardStore } from "@/store/index";

export default {
  data() {
    return {
      socials: {
        github: "https://github.com/merloss",
        spotify: "https://open.spotify.com/user/02q2yz8zr18lpb749ubxvphty",
        reddit: "https://www.reddit.com/user/Merl0ss",
        discord: "https://discord.com/users/489811754411491328",
        twitter: "https://twitter.com/merl0ss",
      },
    };
  },

  async setup() {
    const store = useLanyardStore();

    useLanyard({
      userId: "489811754411491328",
      socket: true,
      async onPresenceUpdate(presence) {
        store.setData(presence);

        if (!presence?.spotify?.album_art_url) return;

        const color = await prominent(presence?.spotify?.album_art_url, {
          format: "hex",
          amount: 1,
        });

        store.setGradientColor(color.toString());
      },
    });

    return { store };
  },
  head() {
    return {
      htmlAttrs: {
        class: this.$colorMode?.value,
      },
    };
  },
  computed: {
    getLoading() {
      return Object.keys(this.store?.lanyardData).length === 0;
    },

    spotifyLoading() {
      return this.store?.lanyardData?.spotify === null;
    },

    getInfo() {
      return {
        statusIndicator: this.store?.lanyardData?.discord_status || "Offline",
        userId: this.store?.lanyardData?.discord_user?.id,
        userAvatar: this.store?.lanyardData?.discord_user?.avatar,
      };
    },
  },
  methods: {
    switchTheme() {
      this.$colorMode.preference =
        this.$colorMode.value === "dark" ? "light" : "dark";
    },
  },
};
</script>
