<script>
import { RouterView } from "vue-router";
import { KeepAlive } from "vue";
import HeadNav from "./components/HeadNav.vue";
import Home from "./pages/Home/Index.vue";
export default {
  name: "App",
  components: {
    Home,
    HeadNav,
    RouterView,
    KeepAlive,
  },
};
</script>

<template>
  <div>
    <HeadNav></HeadNav>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
</style>
