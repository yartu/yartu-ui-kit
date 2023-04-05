<template>
  <div class="flex items-center w-full gap-4 flex-wrap animate-pulse">
    <div
      v-for="i in skeletonCount"
      class="border border-BORDER animate-pulse p-5 flex items-center justify-center rounded-lg"
    >
      <div class="flex flex-col gap-5 justify-center items-center w-56">
        <div class="w-20 h-20 bg-BORDER rounded-lg"></div>
        <div class="w-full h-px bg-BORDER"></div>
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col gap-1">
            <div class="w-20 h-4 bg-BORDER rounded-lg"></div>
            <div class="w-24 h-3 bg-BORDER rounded-lg"></div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="w-20 h-4 bg-BORDER rounded-lg"></div>
            <div class="w-24 h-3 bg-BORDER rounded-lg"></div>
          </div>
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
