<template>
  <div role="status" class="animate-pulse flex flex-col">
    <div v-for="i in skeletonCount" :key="i" class="flex items-center gap-2 ps-1 py-2">
      <div class="h-4 w-4 bg-BORDER rounded"></div>
      <div class="h-3 w-20 bg-BORDER rounded-full"></div>
    </div>
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
