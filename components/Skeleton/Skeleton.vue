<template>
  <div v-if="type.includes('email-list')" role="status" class="p-4 space-y-4 w-full h-full rounded divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
    <div class="flex justify-between items-center" v-for="i in skeletonCount" :key="i">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
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
  }
});

const skeletonCount = computed(() => {
  if (porps.type.includes(':')) {
    const count = porps.type.split(':')[1];
    return parseInt(count, 10);
  }
  return 1;
});

</script>
