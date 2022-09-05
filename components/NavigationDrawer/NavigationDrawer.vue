<template>
  <div
    v-if="open && overlay"
    :class="[open ? '' : 'opacity-0', overlayClass]"
    @click="
      {
        (open = false), $emit('collapse', open);
      }
    "
  ></div>
  <div
    :class="containerClass"
    :style="[widthStyle, bgStyle, topGapStyle, bottomGapStyle]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'y-navigation-drawer',
  emits: ['collapse'],
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: [String, Boolean],
      default: false,
    },
    bg: {
      type: String,
      default: '#f8fafd',
    },
    topGap: {
      type: String,
      default: '0px',
    },
    bottomGap: {
      type: String,
      default: '0px',
    },
  },
  computed: {
    widthStyle() {
      return `width: ${this.width};`;
    },
    bgStyle() {
      return `background-color: ${this.bg};`;
    },
    topGapStyle() {
      return `top: ${this.topGap};`;
    },
    bottomGapStyle() {
      return `bottom: ${this.bottomGap};`;
    },
    overlayClass() {
      return [
        'opacity-50',
        'inset-0 z-5',
        'bg-BLACK-2 ',
        'transition-all duration-300',
        {
          'fixed ': this.fixed,
          'absolute ': this.absolute,
        },
      ];
    },
    containerClass() {
      return [
        'text-left',
        'flex flex-col',
        'text-BLACK-2',
        'transition-all duration-300',
        'overflow-auto',
        'overscroll-contain',
        'z-10',
        {
          'absolute left-0 bottom-0 top-0 border-r border-BORDER':
            this.absolute && !this.right,
          'absolute right-0 bottom-0 top-0 border-l border-BORDER':
            this.absolute && this.right,
          'relative h-full': !this.absolute && !this.fixed,
          'fixed left-0 bottom-0 top-0 border-r border-BORDER':
            this.fixed && !this.right && !this.bottom,
          'fixed right-0 bottom-0 top-0 border-l border-BORDER':
            this.fixed && this.right,
          'fixed left-0 right-0 bottom-0 border-t border-BORDER':
            this.fixed && this.bottom,
          // '!w-0 border-r-0 overflow-auto overscroll-contain': !this.open,
          '-translate-x-full': !this.open && !this.right,
          'translate-x-full': !this.open && this.right,
          'rounded-lg': this.rounded,
        },
      ];
    },
  },
};
</script>

<style></style>
