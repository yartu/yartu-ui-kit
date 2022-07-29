<template>
  <div>
    TOAST
  </div>
</template>
<script setup>

import { onMounted, onUnmounted } from 'vue';
import { useEventBus } from '@vueuse/core';

const bus = useEventBus('yartuNotify');
const listener = (x, y) => {
  console.log('LISTEN...', x, y);
};

onMounted(() => {
  const unsubscribe = bus.on(listener);
});

</script>
