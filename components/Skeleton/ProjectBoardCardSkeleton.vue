<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <div
      v-for="i in skeletonCount"
      class="border border-BORDER animate-pulse w-full xs:w-1/3-gap-4 lg:w-1/4-gap-4 xl:w-1/5-gap-4 px-4 py-3 flex flex-col gap-2 rounded-lg"
    >
      <div class="w-2/5 h-4 bg-BORDER rounded-full"></div>
      <div class="w-4/5 h-2 bg-BORDER rounded-full"></div>
      <div class="w-3/5 h-3 bg-BORDER rounded-full"></div>
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
