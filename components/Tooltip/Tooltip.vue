<template>
  <div class="tooltip-container relative inline-block">
    <slot></slot>
    <span :class="tooltipContainer">
      <slot name="tooltip"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'y-tooltip',
  props: {
    mode: {
      type: String,
      default: 'hover',
    },
    top: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    bottom: {
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
    tooltipContainer() {
      return [
        'y-tooltip',
        'opacity-0',
        'bg-BLACK-1',
        'absolute z-1000 ',
        'rounded',
        'text-white text-center',
        'py-2 px-3',
        'w-max h-max',
        'transition-all duration-500',
        'after:absolute',
        'after:w-2 after:h-2',
        'after:bg-BLACK-1',
        'after:rotate-45',
        'after:origin-center',
        {
          'tooltip-shape-bottom-center bottom-full left-1/2 -translate-x-1/2 mb-2.5':
            this.top && this.center,
          'tooltip-shape-top-center top-full left-1/2 -translate-x-1/2 mt-2.5':
            this.bottom && this.center,
          'tooltip-shape-bottom-left bottom-full left-0 mb-2.5':
            this.top && this.left,
          'after:-top-1 after:left-2 top-full left-0 mt-2.5':
            this.bottom && this.left,
          'after:-bottom-1 after:right-2 bottom-full right-0 mb-2.5':
            this.top && this.right,
          'after:-top-1 after:right-2 top-full right-0 mt-2.5':
            this.bottom && this.right,
          'tooltip-shape-left-center left-full top-1/2 -translate-y-1/2 ml-2.5':
            this.right && !this.top && !this.bottom,
          'tooltip-shape-right-center right-full top-1/2 -translate-y-1/2 mr-2.5':
            this.left && !this.top && !this.bottom,
        },
      ];
    },
  },
};
</script>

<style>
.tooltip-container:hover .y-tooltip {
  opacity: 1;
}

.tooltip-shape-top-mid {
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-shape-top-center::after {
  top: -4px;
  left: calc(50% - 4px);
}

.tooltip-shape-bottom-center::after {
  bottom: -4px;
  left: calc(50% - 4px);
}

.tooltip-shape-bottom-left::after {
  left: 8px;
  bottom: -4px;
}

.tooltip-shape-left-center::after {
  top: calc(50% - 4px);
  left: -4px;
}

.tooltip-shape-right-center::after {
  top: calc(50% - 4px);
  right: -4px;
}
</style>
