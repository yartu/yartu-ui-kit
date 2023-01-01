<template>
  <div class="flex items-center w-full gap-4 flex-wrap">
    <div
      v-for="i in skeletonCount"
      class="border border-BORDER animate-pulse py-5 w-1/4-gap-4 h-52 px-4 flex items-start justify-center rounded-lg"
    >
      <div class="flex flex-col gap-4 justify-center items-center w-full">
        <div class="w-full h-5 bg-BORDER rounded-lg"></div>
        <div class="flex flex-col gap-2 w-full">
          <div class="w-2/3 h-3 h-full bg-BORDER rounded-lg"></div>
          <div class="w-1/3 h-3 h-full bg-BORDER rounded-lg"></div>
          <div class="w-2/3 h-3 h-full bg-BORDER rounded-lg"></div>
          <div class="w-1/3 h-3 h-full bg-BORDER rounded-lg"></div>
        </div>
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
