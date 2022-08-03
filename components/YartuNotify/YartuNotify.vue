<template>
  <div>
  </div>
</template>
<script setup>

import { onMounted, onUnmounted } from 'vue';
import { useEventBus } from '@vueuse/core';

const bus = useEventBus('yartuNotify');

const listener = (x, y) => {
};

onMounted(() => {
  const unsubscribe = bus.on(listener);
});

</script>
