<template>
  <div class="w-full h-[300px] max-w-[220px] min-w-[200px] rounded-lg aspect-1 mx-2 bg-white flex-shrink-0 flex flex-col justify-start items-st text-3xl">
    <el-image class="w-full h-[240px] overflow-hidden rounded-lg" :src="image"></el-image>
    <div class="mt-2 text-[16px] leading-6 max-h-[60px] overflow-auto">那些喜欢到循环播放的歌，那些喜欢到循环播放的歌{{ index }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
//传入数据
const props = defineProps({
  index: Number,
  image: String,
});
</script>

<style>

</style>