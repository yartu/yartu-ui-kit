<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <y-card
      class="w-full 3xs:w-1/2-gap-4 sm:w-1/3-gap-4 lg:w-1/4-gap-4 3xl:w-1/5-gap-4 border border-BORDER ps-4 pe-2 py-2 rounded-lg relative flex-col before:start-0 before:w-2 before:absolute before:h-20 before:rounded-r-lg before:bg-BORDER"
      v-for="i in skeletonCount"
    >
      <div class="h-20 w-full bg-BORDER rounded"></div>
      <div class="flex gap-2 items-center w-full mt-3">
        <div class="w-3/5 h-3 bg-BORDER rounded-lg"></div>
      </div>
    </y-card>
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
