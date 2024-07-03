<template>
  <div class="w-full h-full max-w-[240px] min-w-[200px] max-h-[240px] min-h-[200px] rounded-lg aspect-1 mx-2 bg-red-200 flex flex-col justify-center items-center text-3xl">
    {{ index }}
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
//传入数据
const props = defineProps({
  index: Number,
});
</script>

<style>

</style>