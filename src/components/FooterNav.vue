<template>
  <div class="flex mt-[20px] bottom-0 left-0 h-[80px] w-full bg-white sticky">
    <el-slider class="absolute top-[-14px]" v-model="SongProgressBar" />
    <div class="flex p-3 w-full">
      <div class="flex-1">
        <!--歌曲封面，歌名，歌手名，收藏，评论区，分享，下载-->
      </div>
      <div class="flex flex-1 items-center justify-center">
        <!--播放，下一首/上一首，喜欢，播放模式-->
        <like v-if="isLikeSong" @click="isLikeSong = !isLikeSong" theme="filled" size="25" fill="#f55353" />
        <like v-if="!isLikeSong" @click="isLikeSong = !isLikeSong" theme="outline" size="25" fill="#333" />
        <go-start class="mx-[20px]" theme="outline" size="30" fill="#333"/>
        <play class="" v-if="!isPlay" @click="isPlay = !isPlay" theme="filled" size="50" fill="#f55353"/>
        <pause-one class="" v-if="isPlay" @click="isPlay = !isPlay" theme="filled" size="50" fill="#f55353"/>
        <go-end class="mx-[20px]" theme="outline" size="30" fill="#333"/>
        <loop-once theme="outline" size="25" fill="#333"/>
      </div>
      <div class="flex-1 flex items-center justify-end">
        <!--歌曲列表，音量-->
        <volume-small class="mr-3" theme="outline" size="25" fill="#333"/>
        <hamburger-button class="mr-10" theme="outline" size="25" fill="#333"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Like,GoStart,Play,PauseOne,GoEnd,LoopOnce,VolumeSmall,HamburgerButton } from "@icon-park/vue-next";
//歌曲进度条
const SongProgressBar = ref(0);
const isLikeSong = ref(false);
const isPlay = ref(false);
</script>

<style>
</style>