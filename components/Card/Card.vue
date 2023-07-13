<template>
  <div :class="containerClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-card',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const containerClass = computed(() => {
  return [
    'flex',
    'border border-BORDER rounded-lg',
    'transition-all duration-300',
    'hover:shadow-1',
    {
      'hover:border-BLUE cursor-pointer': !props.disabled,
      'bg-LIGHTBLUE-6 cursor-not-allowed' : props.disabled,
    }
  ];
});
</script>

<style></style>
