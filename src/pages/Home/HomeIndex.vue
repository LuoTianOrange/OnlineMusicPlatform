<template>
  <div class="h-full w-screen flex justify-between flex-col items-center">
    <div class="w-screen flex justify-start flex-col items-center">
      <el-carousel :interval="4000" indicator-position="outside" autoplay type="card" class="w-[1000px] mt-5"
        height="180">
        <el-carousel-item v-for="(item,id) in Playlists" :key="id" class="bg-gray-400 flex justify-center">
          <el-image class="aspect-auto object-scale-down object-top w-full h-full" :src="item.coverImgUrl"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="text-3xl font-bold my-4">精选推荐</div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row max-w-[1300px] w-full">
        <CatBox v-for="i in Playlists" class="my-2 w-full" :Playlists="i"></CatBox>
      </div>
      <div class="text-3xl font-bold my-4">推荐歌单</div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row max-w-[1300px] w-full">
        <CatBox v-for="i in Playlists" class="my-2 w-full" :Playlists="i"></CatBox>
      </div>
    </div>
  </div>
</template>

<script setup>

import CatBox from "@/components/Home/CatBox.vue";
import { ref, onMounted, onBeforeMount } from "vue";
import axios from "axios";
//获取musicHover中的图片
const importAll = import.meta.glob('/src/assets/images/musicHover/*.{jpg,jpeg,png,gif}');
const images = ref([]);

const Playlists = ref([])

onMounted(async () => {
  for (const path in importAll) {
    const module = await importAll[path]();
    images.value.push(module.default);
  }
});
//获取精品歌单tag
const GetQualityPlaylistsTag = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/playlist/highquality/tags`);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};
//获取精品歌单
const GetHighQualityPlaylists = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/top/playlist/highquality?cat=华语&limit=10`);
    Playlists.value = res.data.playlists;
    console.log(res.data.playlists);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async() => {
  GetHighQualityPlaylists();
});
</script>

<style scoped>
:deep(.el-carousel__arrow--left) {
  display: none !important;
}

:deep(.el-carousel__arrow--right) {
  display: none !important;
}
</style>