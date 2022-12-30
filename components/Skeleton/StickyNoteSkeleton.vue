<template>
  <div class="flex items-center w-full gap-4 flex-wrap">
    <div
      v-for="i in skeletonCount"
      class="w-1/5-gap-4 h-full bg-white rounded-lg p-2 animate-pulse border border-BORDER pt-10"
    >
      <div class="w-full h-64 bg-BORDER rounded-lg"></div>
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
