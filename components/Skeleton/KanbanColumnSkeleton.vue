<template>
  <div class="flex items-center gap-6 w-full h-full">
    <div
      v-for="i in skeletonCount"
      class="flex flex-col items-center w-[288px] h-full gap-4 p-3 pt-6 bg-LIGHTBLUE-6 animate-pulse rounded border-t-4 border-GREY-1 overflow-scroll scrollbar-hide"
    >
    <div class="w-full flex items-center justify-between">
      <div class="w-3/5 h-5 bg-BORDER rounded-lg"></div>
      <div class="flex max-w-fit items-center gap-2">
        <div class="w-6 h-6 bg-BORDER rounded-full"></div>
        <div class="w-6 h-6 bg-BORDER rounded-full"></div>
      </div>
    </div>
      <div class="flex flex-col items-center justify-center gap-4 w-full h-auto">
        <div
          v-for="i in Math.ceil(Math.random()*3)"
          class="w-full h-auto bg-white rounded-lg p-2 border border-BORDER flex flex-col gap-3 pt-3"
        >
        <div class="w-3/5 h-4 bg-BORDER rounded-lg"></div>
          <div class="w-full h-36 bg-BORDER rounded-lg"></div>
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
