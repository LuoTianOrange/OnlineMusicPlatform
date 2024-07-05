import { defineStore } from 'pinia'

export const useSongListStore = defineStore('songList', {
    state: () => {
        return {
            songlistData: []
        }
    },
    actions: {
        async setSongListData(songlistData) {
            this.songlistData = await songlistData
        }
    },
    persist: true,
})

export default useSongListStore