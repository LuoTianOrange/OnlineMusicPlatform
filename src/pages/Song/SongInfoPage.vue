<template>
    <div class="min-h-screen w-screen flex justify-start flex-col items-center">
        <div class="max-w-[1200px] w-full flex justify-start flex-col items-start">
            <div class="mt-10 flex flex-row w-full">
                <el-image :src="songData.picUrl" class="h-[240px] w-[240px] rounded-lg flex-shrink-0"></el-image>
                <div class="flex flex-col ml-5 w-full">
                    <div class="text-3xl font-semibold">{{ songData.name }}</div>
                    <div class="flex">
                        <div class="text-base mt-3" v-if="songData.al">专辑：<span class="text-red-400">{{ songData.al.name
                        }}</span></div>
                        <div class="text-base mt-3 ml-5">歌手：<span class="text-red-400">{{ songData.artist }}</span></div>
                    </div>
                    <!--按钮组-->
                    <div class="flex mt-3">
                        <el-button-group class="mr-3">
                            <el-button type="primary">
                                <play class="mr-[5px]" theme="outline" size="20" fill="#fff" />
                                <div>播放</div>
                            </el-button>
                            <el-button type="primary" class="w-[30px]">
                                <plus theme="outline" size="20" fill="#fff" />
                            </el-button>
                        </el-button-group>
                        <el-button>
                            <folder-plus class="mr-[5px]" theme="outline" size="20" fill="#777" />
                            <div>收藏</div>
                        </el-button>
                        <el-button>
                            <share-one class="mr-[5px]" theme="outline" size="20" fill="#777" />
                            <div>分享</div>
                        </el-button>
                        <el-button>
                            <download theme="outline" size="20" fill="#777" />
                            <div>下载</div>
                        </el-button>
                    </div>
                    <!--歌词-->
                    <div class="max-h-[400px] mt-3 overflow-auto">
                        <div class="text-base mt-3" v-if="lyricData" v-html="processedLyrics"></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-20 w-full">
                <div class="w-full py-1">全部评论</div>
            </div>
            <div v-for="item in commentData" :key="item.comments[0].commentId" class="w-full">
            <div v-for="comment in item.comments" :key="comment.commentId"
              class="flex py-[20px] border-b border-stone-400 w-full">
              <el-image :src="comment.user.avatarUrl"
                class="flex-shrink-0 w-[50px] h-[50px] object-cover rounded-[50%] overflow-hidden"></el-image>
              <div class="ml-5 w-full">
                <div>{{ comment.user.nickname }}</div>
                <div>{{ comment.content }}</div>
                <div class="text-[14px] text-stone-400">{{ comment.timeStr }}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Play, Plus, FolderPlus, ShareOne, Download } from '@icon-park/vue-next';
import { useMusicStore } from '../../stores/songinfo.js';

const store = useMusicStore();

const route = useRoute();
const id = route.params.id;
//歌曲信息
const songData = ref([])
//歌词信息
let lyricData = ref([])
//评论信息
const commentData = ref([]);
//歌曲播放
const playData = ref([]);

console.log(id);

// 将毫秒数转换为 mm:ss 格式
const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

//获取音乐详情
onMounted(async () => {
    const getSongInfo = await axios.get(`http://localhost:3000/song/detail?ids=${id}`)
        .then((res) => {
            res.data.songs.forEach(song => {
                const id = song.id
                const al = song.al
                const name = song.name
                const formattedDt = formatDuration(song.dt);
                const picUrl = song.al.picUrl
                const artist = song.ar[0].name
                const songObject = {
                    id,
                    al,
                    name,
                    formattedDt,
                    picUrl,
                    artist
                }
                songData.value = songObject
                store.setSongData(songData.value)
            });
            // console.log(res.data.songs);
            // console.log("songData",songData.value);
        })
        .catch((err) => {
            console.log(err);
        })
    //获取歌词
    const getLyric = await axios.get(`http://localhost:3000/lyric/new?id=${id}`)
        .then((res) => {
            lyricData.value = res.data.lrc.lyric
        })
        .catch((err) => {
            console.log(err);
        })
    //获取歌曲评论
    const getComment = await axios.get(`http://localhost:3000/comment/music?id=${id}`)
        .then((res) => {
            const comments = res.data.comments;
            const hotcomments = res.data.hotComments;
            const commentObject = {
                comments,
                hotcomments,
            };
            commentData.value.push(commentObject);
        })
        .catch((err) => {
            console.log(err);
        })
    //获取歌曲url
    const getSongUrl = await axios.get(`http://localhost:3000/song/url?id=${id}`)
        .then((res) => {
            const url = res.data.data[0].url
            const time = res.data.data[0].time
            const songObject = {
                url,
                time
            }
            playData.value = songObject
            store.setPlayData(playData.value)
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
});
//处理歌词
let processedLyrics = computed(() => {
    if (typeof lyricData.value === 'string') {
        return lyricData.value
            .split('\n') // 将字符串分割成数组
            .map(line => {
                // 尝试解析 JSON 对象
                try {
                    let lyric = JSON.parse(line);
                    if (lyric.c) {
                        return lyric.c.map(item => item.tx).join('');
                    }
                } catch (e) {
                    // 如果解析失败，就返回原始行
                    if (line.startsWith('[') && line.match(/^\[\d{2}:\d{2}\.\d{2}\]/)) {
                        return line.slice(10); // 去掉时间戳
                    }
                }
            })
            .filter(Boolean) // 移除空行
            .join('\n') // 将数组重新连接为字符串
            .replace(/\s/g, '<br>'); // 将空格替换为 <br> 标签
    } else {
        return '';
    }
});
</script>