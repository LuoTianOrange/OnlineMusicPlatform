<template>
  <div class="h-[50px] w-auto flex flex-row items-center">
    <div class="mx-[10px] text-[18px] font-bold" :class="{ 'text-gray-500': !i.selected, 'text-black': i.selected }" v-for="i in tag" :key="i.name" @click="selectTag(i)">
        {{ i.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    tag: Array
})
const emit = defineEmits(['select-tag'])
//是否选择
const selectTag = (selectedTag) => {
    props.tag.forEach(tag => {
        tag.selected = false;
    });
    selectedTag.selected = true;
    emit('select-tag', selectedTag.name);
}
</script>