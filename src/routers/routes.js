const routes = [
    {
        path: '/',
        name: 'Home',
        title: '首页',
        component: () => import('../pages/Home/Index.vue'),
        // redirect: '/',
    }
]

export default routes