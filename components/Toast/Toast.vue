<template>
  <div :class="containerClass" :style="setBg" role="alert">
    <slot></slot>
  </div>
</template>

<script>

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
    duration: {
      type: Number,
      default: 3000,
    },
  },
  created() {
    setTimeout(() => {
      this.$emit('close', this);
    }, this.duration);
  },
  computed: {
    containerClass() {
      return [
        'flex items-center gap-3',
        'max-w-sm w-full',
        'text-white',
        'p-3',
        'rounded-xl',
        'transition-all duration-300',
      ];
    },
    setBg() {
      return 'background-color:' + this.bg + ';';
    },
  },
};
</script>
