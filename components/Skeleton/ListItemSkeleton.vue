<template>
  <div>
    <div
      class="flex items-center w-full space-x-8 mt-6 animate-pulse"
      v-for="i in skeletonCount"
    >
      <div class="h-7 bg-BORDER rounded-full w-full"></div>
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
