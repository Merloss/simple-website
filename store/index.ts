import { defineStore } from "pinia";
import type { LanyardData } from "@leonardssh/use-lanyard";

export const useLanyardStore = defineStore("lanyard", {
  state: () =>
    ({
      lanyardData: {},
    } as {
      lanyardData: LanyardData;
    }),

  actions: {
    setData(lanyard: LanyardData) {
      this.lanyardData = lanyard;
    },
  },
});
