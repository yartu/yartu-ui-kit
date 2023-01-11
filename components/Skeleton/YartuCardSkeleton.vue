<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <y-shaped-card shape v-for="i in skeletonCount">
      <template #content>
        <div class="w-56 h-full bg-LIGHTBLUE-7 rounded-lg"></div>
      </template>
      <div class="flex flex-col gap-2">
        <div class="w-28 h-3 h-full bg-BORDER rounded-lg"></div>
        <div class="w-48 h-3 h-full bg-BORDER rounded-lg"></div>
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
