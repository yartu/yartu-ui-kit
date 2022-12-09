<template>
  <div
    tabindex="0"
    :class="chipContainerClass"
    :style="
      backgroundColor !== 'none'
        ? `background-color: ${backgroundColor + '33'}`
        : 'bg-LIGHTBLUE-6'
    "
  >
    <div class="flex items-center gap-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-chip',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  close: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: 'none',
  },
  outline: {
    type: Boolean,
    default: false,
  },
});

const chipContainerClass = computed(() => [
  'relative',
  'cursor-pointer',
  'inline-flex items-center',
  'text-BLACK-2 text-xs',
  'w-fit',
  {
    'rounded-full': props.rounded,
    'rounded-lg': !props.rounded,
    'px-2 py-1': !props.dense,
    'px-2 py-0.5': props.dense,
    'border border-BORDER': props.outline,
  },
]);
</script>
