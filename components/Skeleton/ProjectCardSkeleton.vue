<template>
  <div class="flex items-center w-full gap-2 flex-wrap animate-pulse">
    <div
      v-for="i in skeletonCount"
      class="border border-BORDER animate-pulse w-full px-4 py-3 flex gap-3 items-center rounded-lg"
    >
      <div class="w-8 h-8 bg-BORDER rounded-lg"></div>

      <div class="flex flex-col gap-1">
        <div class="w-48 h-4 h-full bg-BORDER rounded-lg"></div>
        <div class="w-28 h-3 h-full bg-BORDER rounded-lg"></div>
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
