import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', {
    state: () => {
        return {
            songData: []
        }
    },
    actions: {
        setSongData(songData) {
            this.songData = songData
        }
    },
    persist: true,
})

export default useSongStore