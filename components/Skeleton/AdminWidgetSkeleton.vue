<template>
    <div v-for="i in skeletonCount" class="flex flex-col overflow-auto  w-full">
      <div
        class="flex w-full p-1 max-h-40 rounded-xl animate-pulse  flex-col mb-3 gap-3 bg-BORDER"
      >
        <div class="p-4 w-full rounded-xl">
          <div class="h-3 rounded-full w-1/3 mb-2 bg-white"></div>
          <div class="h-3 rounded-full w-1/5 mb-2 bg-white"></div>
          <div class="w-full h-3 rounded-full mb-2 bg-white"></div>
          <div v-if="memoryWidget" class="h-2 rounded-full w-1/5 mb-2 bg-white"></div>
          <div v-if="memoryWidget" class="w-full h-4 rounded-full  bg-white"></div>
        </div>
      </div>
    </div>
  </template>
<script setup>
const props = defineProps({
  skeletonCount: {
    type: Number,
    required: true,
  },
  memoryWidget: {
    type:Boolean,
    default: false,
  } 
});
</script>
