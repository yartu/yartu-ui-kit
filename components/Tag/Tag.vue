<template>
  <div :class="tagClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-tag',
  props: {
    outline: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tertiary: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tagClass() {
      return [
        'inline-flex flex-row items-center justify-center gap-1',
        'text-sm px-2 py-1.5',
        'text-BLACK-2',
        'min-h-6 min-w-[56px] rounded-full',
        'cursor-pointer',
        {
          'border-2': this.outline,
          'bg-LIGHTBLUE-6 border-BLUE': this.primary,
          'bg-INDIGO-20 border-INDIGO': this.secondary,
          'bg-LIGHTBLUE-6 border-BORDER': this.tertiary,
          'bg-RED-20 border-RED': this.danger,
          'bg-GREEN-20 border-GREEN': this.success,
          'bg-OCEAN-20 border-OCEAN': this.info,
          'bg-YELLOW-20 border-YELLOW': this.warning,
          'border-2 border-BLUE !bg-BLUE/[.12] text-BLUE':
            (this.active && this.primary) || (this.active && this.tertiary),
          'border-2 border-INDIGO !bg-INDIGO/[.12] text-INDIGO':
            this.active && this.secondary,
          'border-2 border-RED !bg-RED/[.12] text-RED':
            this.active && this.danger,
          'border-2 border-GREEN !bg-GREEN/[.12] text-GREEN':
            this.active && this.success,
          'border-2 border-OCEAN !bg-OCEAN/[.12] text-BLUE':
            this.active && this.info,
          'border-2 border-YELLOW !bg-YELLOW/[.12] text-YELLOW':
            this.active && this.warning,
        },
      ];
    },
  },
};
</script>

<style></style>
