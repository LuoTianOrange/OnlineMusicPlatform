<template>
  <div class="flex mt-[20px] bottom-0 left-0 h-[80px] w-full bg-white sticky z-10">
    <el-slider class="absolute top-[-14px]" v-model="SongProgressBar" />
    <div class="flex p-3 w-full">
      <div class="flex-1 flex justify-start ml-[40px] mt-[5px]">
        <!--歌曲封面，歌名，歌手名，收藏，评论区，分享，下载-->
        <el-image class="w-[50px] h-[50px] object-cover overflow-hidden rounded-[50%]" src="./Sampleheader.png"
          alt=""></el-image>
        <audio class="hidden"></audio>
        <div class="ml-[20px]">
          <div>
            <span>歌名</span>
            <span>&nbsp;-&nbsp;</span>
            <span class="text-neutral-400">歌手名</span>
            <span class="ml-3">00:00 / 3:27</span>
          </div>
          <div class="flex justify-start mt-2">
            <div class="flex items-center">
              <folder-plus class="cursor-pointer" theme="outline" size="22" fill="#333" />
              <comment class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
              <share class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
              <folder-download class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <!--播放，下一首/上一首，喜欢，播放模式-->
        <like v-if="isLikeSong" class="cursor-pointer" @click="isLikeSong = !isLikeSong" theme="filled" size="25" fill="#f55353" />
        <like v-if="!isLikeSong" class="cursor-pointer" @click="isLikeSong = !isLikeSong" theme="outline" size="25" fill="#333" />
        <go-start class="mx-[20px] cursor-pointer" theme="outline" size="30" fill="#333" />
        <play class="cursor-pointer" v-if="!isPlay" @click="isPlay = !isPlay" theme="filled" size="50" fill="#f55353" />
        <pause-one class="cursor-pointer" v-if="isPlay" @click="isPlay = !isPlay" theme="filled" size="50" fill="#f55353" />
        <go-end class="mx-[20px] cursor-pointer" theme="outline" size="30" fill="#333" />
        <loop-once class="cursor-pointer" theme="outline" size="25" fill="#333" />
      </div>
      <div class="flex-1 flex items-center justify-end">
        <!--歌曲列表，音量-->
        <div class="relative flex flex-col items-center" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
          <div v-show="showSlider" class="absolute top-[-150px] right-[2px] bg-gray-400 rounded-lg px-2 py-4 shadow-lg ">
            <el-slider class="relative animate-in fade-in zoom-in duration-300" v-model="VolumeSize" vertical
              height="100px" />
          </div>
          <volume-small class="mr-3 relative" theme="outline" size="25" fill="#333" @mouseover="showSlider = true" />
        </div>
        <hamburger-button class="mr-10 transition-all" theme="outline" size="25" fill="#333" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Like, GoStart, Play, PauseOne, GoEnd, LoopOnce, VolumeSmall, HamburgerButton, FolderPlus, Comment, Share, FolderDownload } from "@icon-park/vue-next";
//歌曲进度条
const SongProgressBar = ref(0);
const isLikeSong = ref(false);
const isPlay = ref(false);
//音量显示
const showSlider = ref(false);
//音量大小
const VolumeSize = ref(0);
//音量菜单延迟关闭
let timerId = null;
const handleMouseLeave = () => {
  timerId = setTimeout(() => {
    showSlider.value = false;
  }, 500); // 延迟 0.5 秒
};

const handleMouseEnter = () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
};
</script>

<style scoped>
:deep(.el-slider__bar) {
  background-color: #f55353 !important;
}
:deep(.el-slider__button){
  border: 2px solid #f55353 !important;
}
</style>