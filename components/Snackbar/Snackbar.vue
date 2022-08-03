<template>
  <div :class="snackbarContainer">
    <slot></slot>
    <button
      v-if="closable"
      @click="$emit('close')"
    >
      X
    </button>
  </div>
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
    type: {
      type: String,
      default: '',
    },
    closable: {
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
    snackbarContainer() {
      return [
        'flex',
        'w-full',
        'px-4 py-3',
        'text-white',
        'rounded-xl',
        'bg-BLACK-1',
        'overflow-hidden',
        'justify-between',
        'transition-all duration-300',
        {
          '!bg-RED': this.type === 'danger',
          '!bg-GREEN': this.type === 'success',
          '!bg-ORANGE': this.type === 'warning',
        },
      ];
    },
  },
};
</script>
