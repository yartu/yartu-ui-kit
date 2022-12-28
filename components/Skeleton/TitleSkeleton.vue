<template>
  <div role="status" class="animate-pulse">
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="h-6 bg-BORDER rounded-full w-[240px] mt-0"
    ></div>
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
