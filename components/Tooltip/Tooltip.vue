<template>
  <div
    ref="target"
    class="tooltip-container relative inline-flex"
    @mouseover.native="tooltipOpen"
    @mouseleave.native="tooltipClose"
  >
    <slot name="activator" :open="toggleTooltip"></slot>
    <slot></slot>
    <teleport to="body">
      <transition name="fade">
        <div ref="tooltip" :class="tooltipContainer">
          <div v-show="tooltipStatus" :class="tooltipContent">
            <slot name="tooltip"></slot>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'y-tooltip',
};
</script>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { useTextDirection } from '@vueuse/core';

const dir = useTextDirection();

const props = defineProps({
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
});

const tooltip = ref(null);
const target = ref(null);
const tooltipStatus = ref(false);

const tooltipOpen = () => {
  tooltipStatus.value = true;
  calculatePosition();
};

const tooltipClose = () => {
  tooltipStatus.value = false;
};

const toggleTooltip = () => {
  return tooltipStatus.value ? tooltipClose() : tooltipOpen();
};

const calculatePosition = () => {
  let container = target.value.getBoundingClientRect();
  let tooltipStyle = tooltip.value.style;

  if (props.bottom) {
    tooltipStyle.top = container.bottom + 16 + 'px';
  } else if (props.top) {
    tooltipStyle.top = container.top - 16 + 'px';
  }
  if (props.right && dir.value === 'rtl') {
    tooltipStyle.left = container.left + 'px';
  } else if (props.right) {
    tooltipStyle.left = container.right + 'px';
  } else if (props.left && dir.value === 'rtl') {
    tooltipStyle.left = container.right + 'px';
  } else if (props.left) {
    tooltipStyle.left = container.left + 'px';
  } else if (props.center) {
    tooltipStyle.left = (container.right - container.left) / 2 + container.left + 'px';
  }
};

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const tooltipContainer = computed(() => {
  return [
    'fixed z-1001',
    {
      '-translate-y-full': props.top,
      '-translate-x-1/2': (props.top && props.center) || (props.bottom && props.center),
      'ltr:-translate-x-full': (props.top && props.right) || (props.bottom && props.right),
      'rtl:-translate-x-full': (props.top && props.left) || (props.bottom && props.left),
    },
  ];
});

const tooltipContent = computed(() => {
  return [
    'y-tooltip',
    'bg-BLACK-1',
    'rounded-lg',
    'relative',
    'text-white text-center',
    'py-2 px-3',
    'w-max h-max',
    'shadow-6',
    'after:absolute',
    'after:w-2 after:h-2',
    'after:bg-BLACK-1',
    'after:rotate-45',
    'after:origin-center',
    {
      'after:-bottom-1 after:start-[calc(50%-4px)]': props.top && props.center,
      'after:-top-1 after:start-[calc(50%-4px)]': props.bottom && props.center,
      'after:-start-1 after:top-[calc(50%-4px)]': props.right && !props.top && !props.bottom,
      'after:-end-1 after:top-[calc(50%-4px)]': props.left && !props.top && !props.bottom,
      'after:-bottom-1 after:start-2': props.top && props.left,
      'after:-bottom-1 after:end-2': props.top && props.right,
      'after:-top-1 after:start-2': props.bottom && props.left,
      'after:-top-1 after:end-2': props.bottom && props.right,
    },
  ];
});
</script>
