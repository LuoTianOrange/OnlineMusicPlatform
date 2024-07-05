<template>
  <div class="h-full w-screen flex justify-between flex-col items-center">
    <div class="max-w-[1200px] w-full flex justify-start flex-col items-center">
      <SongTagBar class="h-[50px] w-full flex items-start mt-[20px]" :tag="SongTag"></SongTagBar>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row max-w-[1300px] w-full">
        <CatBox v-for="i in Playlists" class="my-2 w-full" :Playlists="i"></CatBox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount,onBeforeUnmount } from 'vue'
import SongTagBar from '../../components/SongList/SongTagBar.vue'
import CatBox from '../../components/Home/CatBox.vue'
import axios from 'axios'
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
    name: "欧美",
    selected: false,
  },
  {
    name: "日语",
    selected: false,
  },
  {
    name: "粤语",
    selected: false,
  },
  {
    name: "ACG",
    selected: false,
  },
])
//获取musicHover中的图片
const importAll = import.meta.glob('/src/assets/images/musicHover/*.{jpg,jpeg,png,gif}');
const images = ref([]);
const Playlists = ref([])
// console.log(importAll);
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
    const res = await axios.get(`http://localhost:3000/top/playlist/highquality?limit=50`);
    Playlists.value = res.data.playlists;
    console.log(res.data.playlists);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  GetHighQualityPlaylists();
  GetQualityPlaylistsTag();
});
</script>