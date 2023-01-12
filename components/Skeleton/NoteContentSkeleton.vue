<template>
  <div class="w-full flex flex-col gap-5 animate-pulse">
    <div class="w-full flex flex-col gap-2">
      <div class="h-6 bg-BORDER rounded-full w-1/2"></div>
      <div class="h-6 bg-BORDER rounded-full w-2/3"></div>
    </div>
    <div class="flex flex-col w-full gap-2">
      <div class="h-4 bg-BORDER rounded-full w-2/3 mb-4"></div>
      <div
        v-for="i in skeletonCount"
        class="h-3 bg-BORDER rounded-full w-full"
      ></div>
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
