<template>
  <div role="status" class="w-full h-full rounded">
    <div
      class="flex gap-4 py-2.5 px-3 justify-between items-center border-b border-BORDER animate-pulse"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-2/3 h-4 bg-BORDER rounded-full"></div>
        <div class="w-full h-3 bg-BORDER rounded-full"></div>
        <div class="flex gap-2 items-center">
          <div class="w-9 h-3 bg-BORDER rounded-full"></div>
          <div class="w-9 h-3 bg-BORDER rounded-full"></div>
          <div class="w-9 h-3 bg-BORDER rounded-full"></div>
        </div>
        <div class="flex gap-2 items-center">
          <div class="w-16 h-3 bg-BORDER rounded-full"></div>
          <div class="w-px h-3 bg-BORDER"></div>
          <div class="w-16 h-3 bg-BORDER rounded-full"></div>
        </div>
      </div>
      <div class="w-16 h-16 bg-BORDER rounded-lg"></div>
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
