<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center w-full py-4 px-3 animate-pulse border-b border-BORDER" v-for="i in skeletonCount">
      <div class="w-1/2 flex items-center gap-3">
        <div class="h-6 w-6 bg-BORDER rounded flex-shrink-0"></div>
        <div class="h-5 bg-BORDER rounded-full w-2/3"></div>
      </div>
      <div class="w-1/2 flex items-center">
        <div class="w-1/2">
          <div class="h-3 bg-BORDER rounded-full w-1/2"></div>
        </div>
        <div class="w-1/2 flex items-center gap-14">
          <div class="h-3 bg-BORDER rounded-full w-52"></div>
          <div class="h-3 bg-BORDER rounded-full w-52"></div>
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
