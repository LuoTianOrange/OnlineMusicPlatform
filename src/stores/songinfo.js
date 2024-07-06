import { defineStore } from 'pinia';

export const useMusicStore = defineStore({
  id: 'music',
  state: () => ({
    songData: {},
    playData: {}
  }),
  actions: {
    setSongData(songData) {
      this.songData = songData;
    },
    setPlayData(playData) {
      this.playData = playData;
    }
  },
  persist: true,
});
