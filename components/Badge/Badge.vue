<template>
  <span :class="badgeContainerClass">
    <slot></slot>
    <span :class="badgeClass" :style="setStyle">
      <span v-if="ping" :class="indicatorClass" :style="setStyle"></span>
      {{ value }}
    </span>
  </span>
</template>

<script>
export default {
  // TODO :: indicator sizes for content
  name: 'y-badge',
  props: {
    size: {
      type: String,
      default: 'base',
    },
    value: {
      default: '',
    },
    border: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    bgColor: {
      type: String,
      default: '#49ab5e',
    },
    borderColor: {
      type: String,
      default: '#e5ebf5ff',
    },
    ping: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    relative: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    badgeContainerClass() {
      return ['relative', 'inline-flex flex-wrap'];
    },
    badgeClass() {
      return [
        'items-center justify-center',
        'rounded-full',
        'absolute',
        'text-2xs',
        {
          'inline-flex': this.visible,
          'hidden ': !this.visible,
          'absolute ': !this.relative,
          'relative ': this.relative,
          'top-0 right-0': !this.left && !this.bottom,
          'top-0 left-0': this.left && !this.bottom,
          'bottom-0 right-0': this.bottom && !this.left,
          'bottom-0 left-0': this.bottom && this.left,
          'border ': this.border,
          'px-1': this.value !== '',
          'min-w-4 min-h-4': this.size == 'base',
          'min-w-3 min-h-3': this.size == 'sm',
        },
      ];
    },
    indicatorClass() {
      return [
        'rounded-full',
        'absolute z-[1]',
        'w-3 h-3',
        {
          'animate-ping': this.ping,
          'w-4 h-4': this.value !== '',
        },
      ];
    },
    setStyle() {
      return [
        'color:' + this.color + ';',
        'background-color:' + this.bgColor + ';',
        'border-color:' + this.borderColor + ';',
      ];
    },
  },
};
</script>
