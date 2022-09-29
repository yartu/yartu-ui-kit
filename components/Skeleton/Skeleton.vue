<template>
  <div v-if="type.includes('title')" role="status" class="animate-pulse">
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="h-6 bg-BORDER rounded-full w-[240px] mt-0"
    ></div>
  </div>
  <div
    v-else-if="type.includes('email-list')"
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
  <div
    v-else-if="type === 'email-content'"
    role="status"
    class="w-full rounded animate-pulse"
  >
    <div class="flex flex-wrap items-center space-x-3 bg-LIGHTBLUE-6 px-6 py-4">
      <div class="w-10 h-10 bg-BORDER rounded-full"></div>
      <div class="flex-1 flex justify-between">
        <div class="w-1/2 rounded-lg flex flex-col gap-2">
          <div class="w-full h-4 rounded-lg bg-BORDER"></div>
          <div class="w-1/3 h-4 rounded-lg bg-BORDER"></div>
        </div>
        <div class="w-1/5 rounded-lg flex flex-col gap-2">
          <div class="w-full h-3 rounded-lg bg-BORDER"></div>
          <div class="w-1/2 h-3 rounded-lg bg-BORDER"></div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap gap-3 border-y border-BORDER px-6 py-2 items-center"
    >
      <template v-for="i in 8" :key="i">
        <div class="w-8 h-8 bg-BORDER rounded-full"></div>
        <div v-if="i % 3 === 0" class="h-6 w-px bg-BORDER"></div>
      </template>
    </div>

    <div
      v-for="i in 2"
      :key="i"
      :class="i % 2 === 0 ? 'flex-col-reverse' : ''"
      role="status"
      class="flex flex-col gap-2 animate-pulse duration-300 p-6"
    >
      <div class="flex items-center space-x-2 w-full">
        <div class="h-4 bg-BORDER rounded-full w-32"></div>
        <div class="h-4 bg-BORDER rounded-full w-24"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[75%]">
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-24"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[35%]">
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-80"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[50%]">
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-24"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[85%]">
        <div class="h-4 bg-BORDER rounded-full w-32"></div>
        <div class="h-4 bg-BORDER rounded-full w-24"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[60%]">
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
        <div class="h-4 bg-BORDER rounded-full w-80"></div>
        <div class="h-4 bg-BORDER rounded-full w-full"></div>
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
