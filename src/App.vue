<script>
import { RouterView } from "vue-router";
import { KeepAlive } from "vue";
import HeadNav from "@/components/Home/HeadNav.vue";
import Home from "@/pages/Home/HomeIndex.vue";
import FooterNav from "@/components/Home/FooterNav.vue";
export default {
  name: "App",
  components: {
    Home,
    HeadNav,
    FooterNav,
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
    <FooterNav></FooterNav>
  </div>
</template>

<style scoped>
</style>
