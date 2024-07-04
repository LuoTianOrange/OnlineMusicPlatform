<template>
  <div class="h-screen w-screen flex justify-start flex-col items-center">
    <div class="max-w-[1200px] w-full flex justify-start flex-col items-start">
      <div class="mt-10">
        <el-image :src="image" class="h-[240px] w-[240px] rounded-lg"></el-image>
      </div>
      <el-tabs v-model="activeName" :stretch=true class="demo-tabs">
        <el-tab-pane label="歌曲" name="歌曲">歌曲</el-tab-pane>
        <el-tab-pane label="评论" name="评论">评论</el-tab-pane>
        <el-tab-pane label="收藏者" name="收藏者">收藏者</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useSongStore from '../../stores/song.js'
import { storeToRefs } from 'pinia';
const activeName = ref('first')
const songStore = useSongStore();
const { songData } = storeToRefs(songStore)
const image = ref(null)

watch(songData, (newSongData) => {
  image.value = newSongData
  window.scrollTo(0, 0)
}, { immediate: true })
</script>