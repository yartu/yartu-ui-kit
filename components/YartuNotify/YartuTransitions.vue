<template>
  <div :class="notifyTransitionGroup" class="notifyTransitionGroup w-96">
    <transition-group
      @before-leave="beforeLeave"
      :name="setAnimationName"
      :class="notify"
      tag="div"
    >
      <slot></slot>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'y-transitions',
  data() {
    return {
      animationName: '',
    };
  },
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
    middle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
  },
  computed: {
    notifyTransitionGroup() {
      return [
        'fixed',
        'flex flex-wrap',
        'gap-4',
        'z-1002',
        {
          'top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2': this.middle,
          'top-22 left-9': this.left && !this.bottom,
          'bottom-9 left-9': this.left && this.bottom,
          'top-22 right-9': this.right && !this.bottom,
          'bottom-9 right-9': this.right && this.bottom,
          'top-22 -translate-x-1/2 left-1/2': this.center && !this.bottom,
          'bottom-9 -translate-x-1/2 left-1/2': this.center && this.bottom,
        },
      ];
    },
    notify() {
      return [
        'w-full',
        'relative',
        'flex flex-wrap',
        'gap-4',
        {
          'flex-col-reverse': !this.bottom,
        },
      ];
    },
    setAnimationName() {
      let animation = null;
      if (this.center && !this.bottom) animation = 'fade-bottom';
      else if (this.center && this.bottom) animation = 'fade-top';
      else if (this.right && !this.bottom) animation = 'fade-left';
      else if (this.right && this.bottom) animation = 'fade-left';
      else if (this.left && !this.bottom) animation = 'fade-right';
      else if (this.left && this.bottom) animation = 'fade-right';
      return animation;
    },
  },
};
</script>
<style>
.fade-left-move,
.fade-left-enter-active,
.fade-left-leave-active,
.fade-right-move,
.fade-right-enter-active,
.fade-right-leave-active,
.fade-bottom-move,
.fade-bottom-enter-active,
.fade-bottom-leave-active,
.fade-top-move,
.fade-top-enter-active,
.fade-top-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-bottom-enter-from,
.fade-bottom-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-top-enter-from,
.fade-top-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.fade-left-leave-active,
.fade-right-leave-active,
.fade-bottom-leave-active,
.fade-top-leave-active {
  position: absolute;
}
</style>
