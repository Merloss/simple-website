<template>
  <div v-if="getLoading">
    <div class="md:flex gap-3 hidden">
      <skeleton class="h-48 w-48 rounded-md" />
      <div class="gap-8 flex flex-col self-center">
        <skeleton class="w-24 h-4 rounded-md" />
        <skeleton class="w-52 h-4 rounded-md" />
        <skeleton class="w-48 h-4 rounded-md" />
      </div>
    </div>
    <skeleton class="h-4 rounded-md md:hidden w-full my-4" />
  </div>

  <div v-else-if="!getStatus.song" class="text-3xl" />

  <div v-else>
    <div class="flex items-center my-4 md:hidden">
      <icon name="mdi:spotify" class="text-[#3ba55d] h-7 w-7 md:hidden mr-1" />
      <div class="text-xs">
        <span class="font-semibold"> {{ getStatus.song }} </span>
        <span class="font-thin">&nbsp;by&nbsp;</span>
        <span>{{ getStatus.artist }}</span>
      </div>
    </div>

    <div
      class="justify-between hidden text-xs rounded-lg font-extralight md:w-auto xyz-in md:h-48 md:max-w-xl md:text-md md:block"
      xyz="fade"
    >
      <section>
        <div class="flex flex-col pr-4 md:h-full">
          <div class="flex items-center gap-2 truncate md:w-full">
            <div class="hidden h-full w-72 md:block">
              <div class="flex-shrink-0">
                <v-image
                  class="h-full rounded-md"
                  draggable="false"
                  :loading="getLoading"
                  :src="store?.lanyardData?.spotify?.album_art_url"
                />
              </div>
            </div>

            <div
              class="flex flex-col w-full gap-2 px-2 overflow-hidden font-normal truncate md:text-xl"
            >
              <div
                class="flex my-2 space-x-4 space-y-1 overflow-hidden md:flex-col md:my-0 md:space-x-0 w-72"
              >
                <div class="truncate">
                  <Link
                    :href="`https://open.spotify.com/track/${getStatus?.trackId}`"
                    target="_blank"
                    v-tooltip="'Click to go song'"
                    class="font-medium hover:underline md:truncate"
                  >
                    {{ getStatus.song }}
                  </Link>
                </div>

                <span class="truncate">
                  <span class="font-thin">by</span>
                  {{ getStatus.artist }}
                </span>

                <span class="truncate">
                  <span class="font-thin">on</span> {{ getStatus.album }}
                </span>
              </div>

              <div
                class="w-full h-1 mx-auto transition-all rounded-md dark:bg-white/40 bg-black/20"
              >
                <div
                  class="h-1 transition-all bg-black rounded-md dark:bg-white"
                  :style="`width: ${progress}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import Link from "@/components/link.vue";
import { useLanyardStore } from "@/store/index";

const store = useLanyardStore();

const data = reactive({
  rotate: {
    rotate: 360,
    backgroundColor: ["#2f495e", "#00c58e"],
    duration: 3000,
  },
  time: new Date().getTime(),
});

const getLoading = computed(
  () => Object.keys(store?.lanyardData || {}).length === 0
);

const getStatus = computed(() => {
  return {
    statusIndicator: store?.lanyardData?.discord_status || "Offline",
    song: store?.lanyardData?.spotify?.song,
    artist: store?.lanyardData?.spotify?.artist,
    album: store?.lanyardData?.spotify?.album,
    albumurl: store?.lanyardData?.spotify?.album_art_url,
    trackId: store?.lanyardData?.spotify?.track_id,
  };
});

const progress = computed(() => {
  if (store?.lanyardData?.spotify?.timestamps.end) {
    const total =
      store?.lanyardData?.spotify?.timestamps?.end -
      store?.lanyardData?.spotify?.timestamps?.start;
    const progress =
      100 -
      (100 * (store?.lanyardData?.spotify?.timestamps.end - data.time)) / total;

    return progress;
  }
});

onMounted(() => {
  setInterval(() => {
    data.time = new Date().getTime();
  }, 500);
});
</script>
