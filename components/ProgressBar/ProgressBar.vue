<template>
  <div :style="setHeight" :class="containerClass">
    <div :style="[setHeight, setWidth]" :class="[progressClass, animationType]">
      <slot v-if="indeterminate === ''"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-progress-bar',
  props: {
    indeterminate: {
      type: String,
      default: '',
    },
    progress: {
      type: Number,
      default: 30,
    },
    height: {
      type: Number,
      default: 4,
    },
    default: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerClass() {
      return [
        'overflow-hidden',
        'text-center',
        'relative',
        'text-xs',
        'w-full',
        'rounded-full',
        'bg-GREY-9',
      ];
    },
    progressClass() {
      return [
        'y-progress',
        'transition-all duration-700',
        'text-center',
        'flex items-center justify-end',
        'whitespace-nowrap',
        'text-white',
        {
          'bg-BLUE': this.default,
          'bg-GREEN-2': this.success,
          'bg-RED': this.error,
          'bg-GREY-1': this.cancel,
        },
      ];
    },
    animationType() {
      return [
        {
          'animate-loading !w-1/2':
            this.indeterminate.toLowerCase() === 'rider',
          'animate-loading-v2 !w-1/2':
            this.indeterminate.toLowerCase() === 'move',
          'bg-gradient-to-r from-GREY-9 via-BLUE to-GREY-9':
            this.indeterminate.toLowerCase() != '' && this.default,
          'bg-gradient-to-r from-GREY-9 via-GREEN-2 to-GREY-9':
            this.indeterminate.toLowerCase() != '' && this.success,
          'bg-gradient-to-r from-GREY-9 via-RED to-GREY-9':
            this.indeterminate.toLowerCase() != '' && this.error,
          'bg-gradient-to-r from-GREY-9 via-GREY-1 to-GREY-9':
            this.indeterminate.toLowerCase() != '' && this.cancel,
        },
      ];
    },
    setWidth() {
      let progress = this.progress;
      if (progress > 100) {
        progress = 100;
      }
      return 'width:' + progress + '%;';
    },
    setHeight() {
      return 'height:' + this.height + 'px;';
    },
  },
};
</script>
