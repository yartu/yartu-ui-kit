<template>
  <div
    v-if="type.includes('email-list')"
    role="status"
    class="w-full h-full rounded"
  >
    <div
      class="flex gap-2 py-2.5 px-3 justify-between items-center border-b border-BORDER animate-pulse"
      v-for="i in skeletonCount"
      :key="i"
    >
      <div class="w-4 h-4 bg-BORDER rounded"></div>
      <div class="w-9 h-9 bg-BORDER rounded-full"></div>
      <div class="flex flex-1 flex-col gap-1">
        <div class="w-full flex justify-between mb-1">
          <div class="w-1/2 h-4 bg-BORDER rounded-full"></div>
          <div class="w-1/3 h-4 bg-BORDER rounded-full"></div>
        </div>
        <div class="w-1/3 h-3 bg-BORDER rounded-full"></div>
        <div class="w-2/3 h-3 bg-BORDER rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-skeleton',
};
</script>

<script setup>
import { computed } from 'vue';

// TODO : Add more template @aziz
const porps = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const skeletonCount = computed(() => {
  if (porps.type.includes(':')) {
    const count = porps.type.split(':')[1];
    return parseInt(count, 10);
  }
  return 1;
});
</script>
