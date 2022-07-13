<template>
  <teleport to="body">
    <transition name="fade">
      <div :class="snackbarContainer">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// TODO:: event bus, queue
export default {
  name: 'y-snackbar',
  props: {
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    snackbarContainer() {
      return [
        'inline-block',
        'fixed',
        'px-4 py-3',
        'text-white',
        'rounded-xl',
        'bg-BLACK-1',
        'z-1000',
        'overflow-hidden ',
        'transition-all duration-300',
        {
          'top-9 left-9': this.left && !this.bottom,
          'bottom-9 left-9': this.left && this.bottom,
          'top-9 right-9': this.right && !this.bottom,
          'bottom-9 right-9': this.right && this.bottom,
          'top-9 -translate-x-1/2 left-1/2': this.center && !this.bottom,
          'bottom-9 -translate-x-1/2 left-1/2': this.center && this.bottom,
        },
      ];
    },
  },
};
</script>
