<template>
  <div :class="containerClass" :style="setBackgrounColor">
    <slot>
      <span v-if="label">{{ label }}</span>
      <img
        :class="imageClass"
        :src="image"
        v-else-if="image"
        alt="avatar-image"
      />
    </slot>
  </div>
</template>
<script>
export default {
  name: 'y-avatar',
};
</script>
<script setup>
import { computed } from 'vue';
import colors from '../../utils/colors';

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'md',
  },
  shape: {
    type: String,
    default: 'circle',
  },
  color: {
    type: String,
    default: 'blue',
  },
  border: {
    type: Boolean,
    default: false,
  },
});
const containerClass = computed(() => {
  return [
    'y-avatar',
    'inline-flex',
    'justify-center',
    'items-center',
    'leading-none',
    'overflow-hidden',
    'text-center',
    'font-semibold',
    'text-WHITE',
    'uppercase',
    {
      'bg-transparent': props.image != null,
      'rounded-full': props.shape === 'circle',
      'w-6 h-6 text-2xs': props.size === 'xs',
      'w-8 h-8 text-sm': props.size === 'sm',
      'w-9 h-9 text-base': props.size === 'md',
      'w-10 h-10 text-base': props.size === 'lg',
      'w-14 h-14 text-2xl': props.size === 'xl',
      'w-[72px] h-[72px] text-3xl': props.size === '2xl',
      'w-[76px] h-[76px] text-4xl': props.size === '3xl',
      'w-[140px] h-[140px] text-6.5xl': props.size === '4xl',
      'border border-Border': props.border,
    },
  ];
});

const imageClass = computed(() => ['w-full h-full rounded-full']);

const setBackgrounColor = computed(() => {
  let bgColor = '';
  const hash = props.color.includes('#');
  const r = props.color.includes('r');
  const h = props.color.includes('h');

  if (!hash && !r && !h) {
    bgColor = 'background-color:' + colors[props.color].base + ';';
  } else {
    bgColor = 'background-color:' + props.color + ';';
  }
  return bgColor;
});
</script>
