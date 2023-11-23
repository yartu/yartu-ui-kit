<template>
    <div v-for="i in skeletonCount" class="px-3 flex flex-col mb-3 w-full">
          <div class="h-3 rounded-full w-1/3 mb-2 bg-BORDER"></div>
          <div class="w-full h-3 rounded-full  bg-BORDER"></div>
    </div>
  </template>
<script setup>
const props = defineProps({
  skeletonCount: {
    type: Number,
    required: true,
  },
});
</script>
