import { createApp } from 'vue'
import './style.css'
import '@/assets/output.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '../src/routers/index'
import pinia from '../src/stores/index'
import {install} from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';

const app = createApp(App)
app.use(ElementPlus).use(router).use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')