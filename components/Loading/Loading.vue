<template>
  <div class="relative">
    <div class="relative z-1">
      <slot></slot>
    </div>
    <span :class="loadingPatternClass" :style="[setWidth, setBorder]"></span>
  </div>
</template>

<script>
export default {
  name: 'y-loading',
  props: {
    progress: {
      type: Number,
      default: 30,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loadingPatternClass() {
      return [
        'yartu-loading-pattern',
        'block',
        'rounded-md',
        'h-full',
        'absolute',
        'top-0 bottom-0',
        'overflow-hidden',
        'bg-LIGHTBLUE-4',
        'transition-all',
        'duration-700',
        {
          '!w-full': this.indeterminate,
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
    setBorder() {
      let progress = this.progress;
      if (progress < 100) {
        return 'border-top-right-radius: 0; border-bottom-right-radius:0;';
      }
      return '';
    },
  },
};
</script>

<style>
.yartu-loading-pattern:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    135deg,
    #d2e6f9 25%,
    transparent 25%,
    transparent 50%,
    #d2e6f9 50%,
    #d2e6f9 75%,
    transparent 75%,
    transparent
  );
  background-size: 30px 30px;
  animation: move 2s linear infinite;
  overflow: hidden;
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 30px;
  }
}
</style>
