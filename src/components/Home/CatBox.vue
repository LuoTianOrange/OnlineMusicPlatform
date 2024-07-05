<template>
  <div @click="goToSongPage(Playlists)"
    class="w-full h-[300px] max-w-[220px] min-w-[200px] rounded-lg aspect-1 mx-2 bg-white flex-shrink-0 flex flex-col justify-start items-st text-3xl">
    <el-image class="w-full h-[240px] overflow-hidden rounded-lg" :src="Playlists.coverImgUrl"></el-image>
    <div class="mt-2 text-[16px] leading-6 max-h-[60px] overflow-auto">{{ Playlists.name }}</div>
</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import useSongListStore from "../../stores/songlist.js"
//传入数据
const props = defineProps({
  Playlists: Object,
});
const songListStore = useSongListStore();
const router = useRouter();
const hasNavigated = ref(false);
const goToSongPage = (songData) => {
  songListStore.setSongListData(songData)
  router.push({ name: 'Song', params: { id: props.Playlists.id } }).then(() => {
    if (!hasNavigated.value) {
      hasNavigated.value = true;
      newLink();
    }
  });
}
const newLink = () => {
  router.go(0);
}
</script>

<style>

</style>