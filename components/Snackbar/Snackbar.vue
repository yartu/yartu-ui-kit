<template>
  <div :class="snackbarContainer">
    <slot></slot>
    <div
      class="flex flex-wrap gap-2"
    >
      <button
        v-if="this.action"
        @click="this.action.handler(close)"
      >
        {{ action.text }}
      </button>
      <button
        v-if="closable"
        @click="this.close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z" :fill="iconColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967Z" :fill="iconColor"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>

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
      default: 4000,
    },
    iconColor: {
      type: String,
      required: false,
      default: '#FFF',
    },
    finish: {
      type: Function,
      required: false,
    },
    action: {
      type: Object,
      required: false,
    },
  },
  created() {
    setTimeout(() => {
      if (this.finish) {
        this.finish();
      }
      this.$emit('close', this);
    }, this.duration);
  },
  methods: {
    close() {
      this.$emit('close', this);
    },
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
