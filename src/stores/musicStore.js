import { defineStore } from 'pinia';

export const useMusicPlayStore = defineStore({
  id: 'musicplay',
  state: () => ({
    duration: 0,
    currentTime: 0,
    audioRef: null,
  }),
  actions: {
    setAudioRef(ref) {
      this.audioRef = ref;
    },
    updateDuration(time) {
      this.duration = time;
    },
    seekMusic(value) {
      if (this.audioRef) {
        this.audioRef.currentTime = value;
      }
    },
    playMusic() {
      if (this.audioRef) {
        this.audioRef.play();
      }
    },
  },
  persist: true,
});