<template>
  <main
    class="bg-gray-200 dark:bg-[#070510] dark:text-white overflow-hidden transition duration-75 dark:selection:bg-white/10 selection:bg-black/10"
    :style="
      colorMode.value == 'dark'
        ? `background-image: linear-gradient(to top left, #00000000,#00000000, ${store?.gradientColor}40);`
        : ''
    "
  >
    <button
      @click="switchTheme"
      class="flex items-center p-2 transition duration-150 bg-gray-300 dark:bg-gray-900 text-gray-500 rounded-md focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 absolute top-3 right-3"
    >
      <Icon
        :name="
          colorMode.value == 'light' ? 'majesticons:sun' : 'majesticons:moon'
        "
        class="h-5 w-5"
      />
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
              <Icon
                name="twemoji:waving-hand"
                class="self-center h-7 w-7 md:h-10 md:w-10 animate-wavey rotate-90"
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
                v-for="(item, index) in socials"
                :key="index"
                :href="item.url"
              >
                <Icon
                  :name="item.icon"
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
  </main>
</template>

<script setup lang="ts">
import Link from "@/components/link.vue";
import { prominent } from "color.js";
import { useLanyard } from "@leonardssh/use-lanyard";
import { useLanyardStore } from "@/store";
import { socials } from "@/utils/composables/socials";

let store = useLanyardStore();
const colorMode = useColorMode();

const switchTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

useLanyard({
  userId: "489811754411491328",
  socket: true,
  async onPresenceUpdate(presence) {
    store?.setData(presence);

    if (!presence?.spotify?.album_art_url) return;

    const color = await prominent(presence?.spotify?.album_art_url, {
      format: "hex",
      amount: 1,
    });

    store?.setGradientColor(color?.toString());
  },
});

const getLoading = computed(
  () => Object.keys(store?.lanyardData || {}).length === 0
);

const spotifyLoading = computed(() => store?.lanyardData?.spotify === null);

const getInfo = computed(() => ({
  statusIndicator: store?.lanyardData?.discord_status || "Offline",
  userId: store?.lanyardData?.discord_user?.id,
  userAvatar: store?.lanyardData?.discord_user?.avatar,
}));

useHead({
  htmlAttrs: {
    class: colorMode.preference,
  },
  meta: [
    { property: "og:title", content: "Merloss's website" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: window.location.host },
    {
      property: "og:description",
      content: `${
        new Date().getFullYear() - 2002
      } years old Turkish student, studying in Computer Programming and I try to learn new things every day in order to improve myself.`,
    },
    {
      property: "og:image",
      content: `https://cdn.discordapp.com/avatars/${getInfo?.value?.userId}/${getInfo?.value?.userAvatar}.png?size=1024`,
    },
    //
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Merloss's website",
    },
    {
      name: "twitter:description",
      content: `${
        new Date().getFullYear() - 2002
      } years old Turkish student, studying in Computer Programming and I try to learn new things every day in order to improve myself.`,
    },
    {
      name: "twitter:image",
      content: `https://cdn.discordapp.com/avatars/${getInfo?.value?.userId}/${getInfo?.value?.userAvatar}.png?size=1024`,
    },
  ],
});
</script>
