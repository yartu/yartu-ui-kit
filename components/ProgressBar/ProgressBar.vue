<template>
  <div :style="setHeight" :class="containerClass">
    <div
      v-if="!split"
      :style="[setHeight, setWidth]"
      :class="[progressClass, animationType, color ? 'setColor' : '']"
    >
      <slot v-if="indeterminate === ''"></slot>
    </div>
    <div
      v-else
      v-for="i in 4"
      :key="i"
      :style="setHeight"
      class="w-1/2-gap-1 bg-GREY-9 rounded-full"
    >
      <div
        :style="[
          setHeight,
          progress >= i * 25 ? 'width:100%' : setSplitWidth(i),
        ]"
        :class="setColorClass"
        class="rounded-full transition-all duration-300"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-progress-bar',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  indeterminate: {
    type: String,
    default: '',
  },
  progress: {
    type: Number,
    default: 55,
  },
  split: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 4,
  },
  default: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  cancel: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});

const setSplitWidth = (e) => {
  let progress = props.progress;
  let width = progress - (e - 1) * 25;
  if (width >= 100) width = 100;
  if (progress - (e - 1) * 25 < 0) return 'width: 0%;';
  return `width: ${width}%;`;
};

const containerClass = computed(() => [
  'overflow-hidden',
  'text-center',
  'relative',
  'text-xs',
  'w-full',
  'rounded-full',
  {
    'flex gap-2': props.split,
    'bg-GREY-9': !props.split && !props.transparent,
  },
]);

const progressClass = computed(() => [
  'y-progress',
  'transition-all duration-700',
  'text-center',
  'flex items-center justify-end',
  'whitespace-nowrap',
  'text-white',
  {
    'bg-BLUE': props.default,
    'bg-GREEN': props.success,
    'bg-RED': props.error,
    'bg-GREY-1': props.cancel,
  },
]);

const animationType = computed(() => [
  {
    'animate-loading !w-1/2': props.indeterminate.toLowerCase() === 'rider',
    'animate-loading-v2 !w-1/2': props.indeterminate.toLowerCase() === 'move',
    'bg-gradient-to-r from-GREY-9 via-BLUE to-GREY-9':
      props.indeterminate.toLowerCase() != '' && props.default,
    'bg-gradient-to-r from-GREY-9 via-GREEN to-GREY-9':
      props.indeterminate.toLowerCase() != '' && props.success,
    'bg-gradient-to-r from-GREY-9 via-RED to-GREY-9':
      props.indeterminate.toLowerCase() != '' && props.error,
    'bg-gradient-to-r from-GREY-9 via-GREY-1 to-GREY-9':
      props.indeterminate.toLowerCase() != '' && props.cancel,
  },
]);

const setWidth = computed(() => {
  let progress = props.progress;
  if (progress > 100) {
    progress = 100;
  }
  return `width:${progress}%;`;
});

const setHeight = computed(() => `height:${props.height}px;`);

const setColorClass = computed(() => {
  let progress = props.progress;
  if (progress <= 25) return 'bg-RED';
  else if (progress <= 50) return 'bg-ORANGE';
  else if (progress <= 75) return 'bg-YELLOW';
  return 'bg-GREEN';
});
</script>

<style>
.setColor {
  background-color: v-bind(color) !important;
}
</style>
