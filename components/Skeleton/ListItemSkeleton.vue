<template>
  <div>
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="flex items-center w-full space-x-8 mt-6 animate-pulse"
    >
      <div class="h-7 bg-BORDER rounded-full w-full"></div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  skeletonCount: {
    type: Number,
    required: true,
  },
});
</script>
