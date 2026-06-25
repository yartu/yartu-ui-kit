<template>
  <div class="flex flex-col gap-3 w-full">
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="flex items-center w-full animate-pulse gap-6"
    >
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
      <div class="h-5 bg-BORDER rounded-full w-20"></div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  skeletonCount: {
    type: Number,
    required: true,
  },
});

</script>
