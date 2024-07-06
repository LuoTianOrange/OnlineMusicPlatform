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
        path: '/songlist/:id',
        name: 'SongListDetail',
        title: '歌单列表',
        component: () => import('../pages/SongList/SongPage.vue'),
    },
    {
        path: '/songinfopage/:id',
        name: 'SongInfoPage',
        title: '歌曲详情',
        component: () => import('../pages/Song/SongInfoPage.vue'),
    }
]

export default routes