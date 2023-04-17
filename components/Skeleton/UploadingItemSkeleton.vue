<template>
  <div role="status" class="w-full h-full rounded animate-pulse flex flex-col gap-3">
    <div class="flex gap-2 items-center" v-for="i in skeletonCount" :key="i">
      <div class="w-8 h-8 bg-BORDER rounded-lg"></div>
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-1/2 h-3 bg-BORDER rounded-full"></div>
        <div class="w-full h-1 bg-BORDER rounded-full"></div>
        <div class="w-full flex items-center justify-between">
          <div class="w-16 h-2 bg-BORDER rounded-full"></div>
          <div class="w-16 h-2 bg-BORDER rounded-full"></div>
        </div>
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
});
</script>
