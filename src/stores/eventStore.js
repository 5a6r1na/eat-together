import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    selectedTab: "1",
  }),
  actions: {
    updateSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
});
