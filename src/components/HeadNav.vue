<template>
  <div class="w-full h-[60px] px-[10px] bg-white shadow-md sticky top-0 z-10">
    <div class="w-full h-full mx-[10px] flex items-center">
      <div class="flex-1 flex items-center">
        <headset class="h-[35px] my-[10px]" theme="filled" size="18" fill="#333" />
        <span class="text-nowrap hidden md:block text-base ml-3 select-none">MUSIC PROFROM</span>
        <router-link v-for="i in MenuOption" :key="i.link" :to="{name: i.link}"
          class="select-none ml-4 py-[18px] text-nowrap px-5 hover:border-gray-50 relative" :class="{
              'before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-red-500': MenuDefaultActive === i.link,
            }" @click="MenuDefaultActive = `${i.link}`">
          {{i.name}}
        </router-link>
      </div>
      <el-input class="flex-1 ml-5" v-model="SearchInput"  placeholder="搜索">
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
      <div class="flex-1 flex justify-end mr-[20px]">
        <el-avatar :size="40" shape="circle" :src="UserAvatar"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

//搜索框
const SearchInput = ref("");
//用户头像
const UserAvatar = ref("./Sampleheader.png");
//菜单默认打开项
const MenuDefaultActive = ref("home");
//菜单选项
const MenuOption = ref([
  {
    name: "首页",
    link: "Home",
    router: "/",
  },
  {
    name: "歌单",
    link: "SongList",
    router: "/songlist",
  },
  {
    name: "歌手",
    link: "Singer",
    router: "/Singer",
  },
]);

</script>

<style scoped>

</style>