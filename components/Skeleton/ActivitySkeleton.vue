<template>
  <div
    role="status"
    class="w-full h-full flex flex-col gap-5 animate-pulse py-7"
  >
    <div
      class="flex gap-3 items-start w-full"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="w-8 h-8 bg-BORDER rounded-full flex-shrink-0"></div>
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-1/2 h-3 bg-BORDER rounded-full"></div>
        <div class="w-1/5 h-2 bg-BORDER rounded-full"></div>
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
