<template>
  <teleport to="body">
    <transition name="fade">
      <div :class="containerClass" :style="setBg" role="alert">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// TODO: https://vue-toastification.maronato.dev/

export default {
  name: 'y-toast',
  props: {
    type: {
      type: String,
      default: 'succes',
    },
    bg: {
      type: String,
      default: '#49ab5eff',
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    maxToasts: {
      type: [Number, Boolean],
      default: false,
    },
    duration: {
      type: [Number, Boolean],
      default: 3000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    queue: {
      type: Boolean,
      default: false,
    },
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {},
  computed: {
    containerClass() {
      return [
        'fixed z-50',
        'flex items-center gap-3',
        'max-w-sm w-full',
        'text-white',
        'p-3',
        'rounded-xl',
        {
          '!bottom-[8%]': this.bottom,
          '!left-8 !right-0': this.left,
          'top-[8%]': !this.bottom,
          'right-8': !this.left,
          '': this.succes,
        },
      ];
    },
    setBg() {
      return 'background-color:' + this.bg + ';';
    },
  },
};
</script>

<style></style>
