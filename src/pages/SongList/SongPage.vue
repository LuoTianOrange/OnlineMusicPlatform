<template>
  <div class="min-h-screen w-screen flex justify-start flex-col items-center">
    <div class="max-w-[1200px] w-full flex justify-start flex-col items-start">
      <div class="mt-10 flex flex-row">
        <el-image :src="coverImgUrl" class="h-[240px] w-[240px] rounded-lg flex-shrink-0"></el-image>
        <div class="flex flex-col ml-5">
          <div class="text-2xl font-semibold">{{ name }}</div>
          <div class="text-base mt-3">{{ description }}</div>
        </div>
      </div>
      <el-tabs v-model="activeName" :stretch=true class="w-full">
        <el-tab-pane label="歌曲" name="歌曲">
          <el-table :data="songList" stripe style="width: 100%" @row-click="goToSongInfoPage">
            <el-table-column type="index" label="#" width="50">
              <template #default="{ $index }">
                {{ $index < 9 ? `0${$index + 1}` : $index + 1 }} </template>
            </el-table-column>
            <el-table-column prop="songname" label="歌曲名" width="300" />
            <el-table-column prop="artists" label="歌手" width="200" />
            <el-table-column prop="formattedDt" label="时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="评论">
          <div>全部评论</div>
          <div v-for="item in commentData" :key="item.comments[0].commentId">
            <div v-for="comment in item.comments" :key="comment.commentId" class="flex py-[20px] border-b border-stone-400 ">
              <el-image :src="comment.user.avatarUrl" class="flex-shrink-0 w-[50px] h-[50px] object-cover rounded-[50%] overflow-hidden"></el-image>
              <div class="ml-5">
                <div>{{ comment.user.nickname }}</div>
                <div>{{ comment.content }}</div>
                <div class="text-[14px] text-stone-400">{{ comment.timeStr }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="收藏者">收藏者</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import useSongListStore from '../../stores/song.js'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const id = route.params.id; // 获取 id 参数

const activeName = ref('歌曲')
const coverImgUrl = ref('');
const description = ref('');
const name = ref('');
const songList = ref([]);
const songListStore = useSongListStore();
let songListData = ref(null)
// const { songListData } = storeToRefs(songListStore);

const commentData = ref([]);

// 将毫秒数转换为 mm:ss 格式
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

onMounted(async () => {
  //获取歌单详情
  const getList = await axios.get(`http://localhost:3000/playlist/detail?id=${id}`)
    .then((res) => {
      songListData.value = res.data.playlist
      coverImgUrl.value = res.data.playlist.coverImgUrl;
      description.value = res.data.playlist.description;
      name.value = res.data.playlist.name;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  //获取歌单歌曲
  const getSongList = await axios.get(`http://localhost:3000/playlist/track/all?id=${id}&limit=100`)
    .then((res) => {
      res.data.songs.forEach(song => {
        const songname = song.name;
        const formattedDt = formatDuration(song.dt);
        const artists = song.ar.map(artist => artist.name).join(', ');
        const id = song.id;
        const songObject = {
          id,
          songname,
          formattedDt,
          artists
        };
        // console.log(songObject);
        songList.value.push(songObject);
      });
    })
  //获取评论
  const getComment = await axios.get(`http://localhost:3000/comment/playlist?id=${id}`)
    .then((res) => {
      const comments = res.data.comments;
      const user = res.data.user;
      const commentObject = {
        comments,
        user,
      };
      commentData.value.push(commentObject);
      console.log("commentData", commentData.value);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
})

//重载图片
watch(songListData, (newsongListData) => {
  if (newsongListData) {
    coverImgUrl.value = newsongListData.coverImgUrl;
    console.log("data:", newsongListData);
  }
  window.scrollTo(0, 0);
}, { immediate: true })
//跳转歌曲详细页面
const goToSongInfoPage = (row, event) => {
  router.push({ name: 'SongInfoPage', params: { id: row.id } });
  console.log(row, event);
}
</script>
<style scoped>
:deep(.el-tabs__item) {
  max-width: 80px !important;
}
</style>