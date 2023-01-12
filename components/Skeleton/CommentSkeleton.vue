<template>
  <div
    role="status"
    class="w-full h-full flex flex-col gap-5 animate-pulse py-7"
  >
    <div
      class="flex flex-col gap-2 w-full"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="flex items-center gap-3 w-full">
        <div class="w-8 h-8 bg-BORDER rounded-full flex-shrink-0"></div>
        <div class="w-1/3 h-3 bg-BORDER rounded-full"></div>
      </div>
      <div class="w-full h-11 bg-BORDER rounded-lg"></div>
      <div class="flex items-center gap-2">
        <div v-for="i in 4" class="w-8 h-6 bg-BORDER rounded-full"></div>
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
