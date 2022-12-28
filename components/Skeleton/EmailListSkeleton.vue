<template>
  <div role="status" class="w-full h-full rounded">
    <div
      class="flex gap-2 py-2.5 px-3 justify-between items-center border-b border-BORDER animate-pulse"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="w-4 h-4 bg-BORDER rounded"></div>
      <div class="w-9 h-9 bg-BORDER rounded-full"></div>
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-full flex justify-between mb-1">
          <div class="w-1/2 h-4 bg-BORDER rounded-full"></div>
          <div class="w-20 h-4 bg-BORDER rounded-full"></div>
        </div>
        <div class="w-1/3 h-3 bg-BORDER rounded-full"></div>
        <div class="w-2/3 h-3 bg-BORDER rounded-full"></div>
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
