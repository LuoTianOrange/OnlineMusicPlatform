<template>
  <div class="flex mt-[20px] bottom-0 left-0 h-[80px] w-full bg-white sticky z-10">
    <el-slider class="absolute top-[-14px]" v-model="currentTime" @input="seekMusic" :max="duration.value" :step="1"
      :show-tooltip="false" />
    <div class="flex p-3 w-full">
      <div class="flex-1 flex justify-start ml-[40px] mt-[5px]">
        <!--歌曲封面，歌名，歌手名，收藏，评论区，分享，下载-->
        <el-image class="w-[50px] h-[50px] object-cover overflow-hidden rounded-[50%]" :src="songData.picUrl"
          alt=""></el-image>
        <div class="ml-[20px]">
          <div class="flex flex-row marquee">
            <div class="marquee-content flex ">
              <span class="flex-shrink-0">{{ songData.name }}</span>
              <span class="flex-shrink-0">&nbsp;-&nbsp;</span>
              <span class="text-neutral-400 flex-shrink-0">{{ songData.artist }}</span>
            </div>
          </div>
          <div class="flex justify-start mt-1">
            <div class="flex items-center">
              <folder-plus class="cursor-pointer" theme="outline" size="22" fill="#333" />
              <comment class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
              <share class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
              <folder-download class="ml-3 cursor-pointer" theme="outline" size="22" fill="#333" />
            </div>
            <span class="ml-3 flex-shrink-0">00:00 / {{ songData.formattedDt }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <!--播放，下一首/上一首，喜欢，播放模式-->
        <like v-if="isLikeSong" class="cursor-pointer" @click="isLikeSong = !isLikeSong" theme="filled" size="25"
          fill="#f55353" />
        <like v-if="!isLikeSong" class="cursor-pointer" @click="isLikeSong = !isLikeSong" theme="outline" size="25"
          fill="#333" />
        <go-start class="mx-[20px] cursor-pointer" theme="outline" size="30" fill="#333" />
        <play class="cursor-pointer" v-if="!isPlay" @click="isPlay = !isPlay; playMusic()" theme="filled" size="50"
          fill="#f55353" />
        <pause-one class="cursor-pointer" v-if="isPlay" @click="isPlay = !isPlay; pauseMusic()" theme="filled" size="50"
          fill="#f55353" />
        <go-end class="mx-[20px] cursor-pointer" theme="outline" size="30" fill="#333" />
        <loop-once class="cursor-pointer" theme="outline" size="25" fill="#333" />
      </div>
      <div class="flex-1 flex items-center justify-end">
        <!--歌曲列表，音量-->
        <div class="relative flex flex-col items-center" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
          <div v-show="showSlider" class="absolute top-[-150px] right-[2px] bg-white rounded-lg px-2 py-4 shadow-lg ">
            <el-slider class="relative animate-in fade-in zoom-in duration-300" v-model="VolumeSize" vertical size="small"
              height="100px" />
          </div>
          <volume-small class="mr-3 relative" theme="outline" size="25" fill="#333" @mouseover="showSlider = true" />
        </div>
        <hamburger-button class="mr-10 transition-all" theme="outline" size="25" fill="#333" />
      </div>
    </div>
    <audio ref="audioRef" :src="playData.url" @timeupdate="updateProgress" @loadedmetadata="updateDuration"
      class="hidden"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { Like, GoStart, Play, PauseOne, GoEnd, LoopOnce, VolumeSmall, HamburgerButton, FolderPlus, Comment, Share, FolderDownload } from "@icon-park/vue-next";
import { useMusicStore } from '../../stores/songinfo.js';

const store = useMusicStore();
const songData = computed(() => store.songData);
const playData = computed(() => store.playData);
const audioRef = ref(null);
const currentTime = ref(0);
const duration = ref(0);

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

// 当组件挂载后，监听 songData 的变化
onMounted(() => {
  watch(songData, (newSongData) => {
    if (newSongData.url) {
      audioRef.value.load();
    }
  });
});
//播放音乐
const playMusic = () => {
  audioRef.value.play();
};
//暂停音乐
const pauseMusic = () => {
  audioRef.value.pause();
};
//更新进度条
const updateProgress = () => {
  currentTime.value = audioRef.value.currentTime;
};
//更新音乐时长
const updateDuration = () => {
  duration.value = playData.value.time / 1000;
};
//拖动进度条
const seekMusic = (value) => {
  audioRef.value.currentTime = value;
};
//小数化整数
const formatTooltip = (value) => {
  return Math.floor(value);
};

</script>

<style scoped>
:deep(.el-slider__bar) {
  background-color: #f55353 !important;
}

:deep(.el-slider__button) {
  border: 2px solid #f55353 !important;
}

.marquee {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.marquee-content {
  display: inline-block;
  padding-left: 20%;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}</style>