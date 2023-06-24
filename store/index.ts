import { defineStore } from "pinia";
import type { LanyardData } from "@leonardssh/use-lanyard";

export const useLanyardStore = defineStore("lanyard", {
  state: () =>
    ({
      lanyardData: {},
      gradientColor: "",
    } as {
      lanyardData: LanyardData;
      gradientColor: string;
    }),

  actions: {
    setData(lanyard: LanyardData) {
      this.lanyardData = lanyard;
    },
    setGradientColor(color: string) {
      this.gradientColor = color;
    },
  },
});
