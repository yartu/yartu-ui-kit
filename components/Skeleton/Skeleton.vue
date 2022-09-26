<template>
  <div v-if="type.includes('title')" role="status" class="animate-pulse">
      <div v-for="i in skeletonCount" :key="i" class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-[240px] mt-0"></div>
  </div>
  <div v-if="type.includes('email-list')" role="status" class="p-4 space-y-4 w-full h-full rounded divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
    <div class="flex justify-between items-center mt-2" v-for="i in skeletonCount" :key="i">
        <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
  </div>
  <div v-else-if="type === 'email-content'" role="status" class="p-8 w-full rounded animate-pulse dark:border-gray-700">
    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="flex items-center mt-4 space-x-3">
        <svg class="w-14 h-14 text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        <div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    </div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mt-8"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
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
