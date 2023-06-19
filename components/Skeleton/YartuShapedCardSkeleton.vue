<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <y-shaped-card class="w-full 3xs:w-1/2-gap-4 sm:w-1/3-gap-4 lg:w-1/4-gap-4 3xl:w-1/5-gap-4" shape v-for="i in skeletonCount">
      <template #content>
        <div class="w-full h-full bg-LIGHTBLUE-7 rounded-lg"></div>
      </template>
      <div class="flex flex-col gap-2">
        <div class="w-28 h-3 bg-BORDER rounded-lg"></div>
        <div class="w-48 h-3 bg-BORDER rounded-lg"></div>
      </div>
    </y-shaped-card>
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
