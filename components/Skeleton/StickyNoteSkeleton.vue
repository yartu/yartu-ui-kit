<template>
  <div class="flex items-center w-full gap-4 flex-wrap">
    <div
      v-for="i in skeletonCount"
      class="w-full 4xs:w-1/2-gap-6 xs:w-1/3-gap-6 lg:w-1/4-gap-6 2xl:w-1/5-gap-6 h-full bg-white rounded-lg p-2 animate-pulse border border-BORDER pt-10"
    >
      <div class="w-full h-64 bg-BORDER rounded-lg"></div>
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
