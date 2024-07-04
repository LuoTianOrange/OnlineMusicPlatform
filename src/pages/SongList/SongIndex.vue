<template>
  <div class="h-full w-screen flex justify-between flex-col items-center">
    <div class="max-w-[1200px] w-full flex justify-start flex-col items-center">
      <SongTagBar class="h-[50px] w-full flex items-start mt-[20px]" :tag="SongTag"></SongTagBar>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row max-w-[1300px] w-full">
        <CatBox v-for="i in images" class="my-2 w-full" :image="i"></CatBox>
        <CatBox v-for="i in images" class="my-2 w-full" :image="i"></CatBox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import SongTagBar from '../../components/SongList/SongTagBar.vue'
import CatBox from '../../components/Home/CatBox.vue'
const SongTag = ref([
  {
    name: "全部歌单",
    selected: true,  
  },
  {
    name: "华语",
    selected: false,
  },
  {
    name: "粤语",
    selected: false,
  },
  {
    name: "英语",
    selected: false,
  },
  {
    name: "日语",
    selected: false,
  }
])
//获取musicHover中的图片
const importAll = import.meta.glob('/src/assets/images/musicHover/*.{jpg,jpeg,png,gif}');
const images = ref([]);
// console.log(importAll);
onMounted(async () => {
  for (const path in importAll) {
    const module = await importAll[path]();
    images.value.push(module.default);
  }
});
</script>