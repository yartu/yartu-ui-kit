<template>
  <div role="status" class="w-full h-full rounded animate-pulse">
    <div class="w-1/3 h-3 bg-BORDER rounded-full"></div>
    <div
      class="flex gap-2 py-2.5 justify-between items-center border-b border-BORDER"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="w-9 h-9 bg-BORDER rounded-full"></div>
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-full flex justify-between mb-1">
          <div class="w-1/2 h-4 bg-BORDER rounded-full"></div>
        </div>
        <div class="w-full h-3 bg-BORDER rounded-full"></div>
        <div class="w-full h-3 bg-BORDER rounded-full"></div>
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
