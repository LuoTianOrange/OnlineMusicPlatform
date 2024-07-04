const routes = [
    {
        path: '/',
        name: 'Home',
        title: '首页',
        component: () => import('../pages/Home/HomeIndex.vue'),
        // redirect: '/',
    },
    {
        path: '/songlist',
        name: 'SongList',
        title: '歌单',
        component: () => import('../pages/SongList/SongIndex.vue'),
    },
    {
        path: '/singer',
        name: 'Singer',
        title: '歌手',
        component: () => import('../pages/Singer/SingerIndex.vue'),
    },
    {
        path: '/song/:img',
        name: 'Song',
        title: '歌曲',
        component: () => import('../pages/SongList/SongPage.vue'),
    }
]

export default routes