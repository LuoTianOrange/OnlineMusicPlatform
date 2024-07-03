<template>
  <div class="h-full w-screen flex justify-between flex-col items-center">
    <div class="flex justify-start flex-col items-center">
      <el-carousel :interval="14000" indicator-position="outside" type="card" class="w-[1000px] mt-5" height="180">
        <el-carousel-item v-for="(item,i) in images" :key="i" class="bg-gray-400 flex justify-center">
          <el-image class="aspect-auto object-scale-down object-top w-full h-full" :src="item"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="text-3xl font-bold my-2">歌单</div>
      <div class="grid grid-cols-4 gap-4 grid-flow-row-dense max-w-[1400px]">
        <CatBox v-for="i in 10" class="my-2" :index="i"></CatBox>
      </div>
    </div>
    <FooterNav></FooterNav>
  </div>
</template>

<script setup>
import FooterNav from "@/components/FooterNav.vue";
import CatBox from "@/components/CatBox.vue";
import { ref,onMounted } from "vue";
//获取assets中的图片
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

<style scoped>
    :deep(.el-carousel__arrow--left){
        display: none !important;
    }
    :deep(.el-carousel__arrow--right){
        display: none !important;
    }
</style>