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
import colors from '../../utils/colors';

export default {
  name: 'y-avatar',
  props: {
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
  },
  computed: {
    containerClass() {
      return [
        'y-avatar',
        'inline-flex',
        'justify-center',
        'items-center',
        'leading-none',
        'overflow-hidden',
        'text-center',
        'text-base',
        'font-semibold',
        'text-WHITE',
        'uppercase',
        {
          'bg-transparent': this.image != null,
          'rounded-full': this.shape === 'circle',
          'w-6 h-6 !text-2xs': this.size === 'xs',
          'w-8 h-8 text-sm': this.size === 'sm',
          'w-9 h-9': this.size === 'md',
          'w-10 h-10': this.size === 'lg',
          'w-14 h-14 text-2xl': this.size === 'xl',
          'w-[72px] h-[72px] text-3xl': this.size === '2xl',
          'w-[76px] h-[76px] text-4xl': this.size === '3xl',
          'w-[140px] h-[140px] text-6.5xl': this.size === '4xl',
          'border border-Border': this.border,
        },
      ];
    },
    imageClass() {
      return ['w-full h-full rounded-full'];
    },
    setBackgrounColor() {
      let bgColor = '';
      if (
        !this.color.includes('#') &&
        !this.color.includes('r') &&
        !this.color.includes('h')
      )
        bgColor = 'background-color:' + colors[this.color].base + ';';
      else bgColor = 'background-color:' + this.color + ';';
      return bgColor;
    },
  },
};
</script>

<style></style>
