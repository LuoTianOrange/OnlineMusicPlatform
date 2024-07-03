<template>
  <div class="w-[240px] h-[240px] rounded-lg aspect-1 mx-2 bg-red-200 flex flex-col justify-center items-center text-3xl">
    {{ index }}
  </div>
</template>

<script setup>
import { ref,reactive, defineProps } from "vue";
//传入数据
const props = defineProps({
  index: Number,
});
</script>

<style>
</style>