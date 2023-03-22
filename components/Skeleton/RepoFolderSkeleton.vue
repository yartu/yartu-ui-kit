<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <div
      v-for="i in skeletonCount"
      class="border border-BORDER animate-pulse px-4 py-3 flex gap-3 items-center rounded-lg w-full 3xs:w-1/2-gap-4 sm:w-1/3-gap-4 xl:w-1/4-gap-4 3xl:w-1/5-gap-4"
    >
      <div class="w-8 h-8 bg-BORDER rounded-lg shrink-0"></div>

      <div class="flex flex-col gap-1 w-full">
        <div class="w-1/2 h-3 bg-BORDER rounded-lg"></div>
        <div class="w-4/5 h-2 bg-BORDER rounded-lg"></div>
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
