<template>
  <div class="flex flex-col gap-3 w-full">
    <div
      class="flex items-center w-full animate-pulse gap-6"
      v-for="i in skeletonCount"
    >
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
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
