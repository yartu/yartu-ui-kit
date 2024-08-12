<template>
  <div
    v-if="open && overlay"
    :class="[open ? '' : 'opacity-0', overlayClass]"
    @click="emitCollapse"
  ></div>
  <div
    :class="containerClass"
    :style="[widthStyle, bgStyle, topGapStyle, bottomGapStyle]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'y-navigation-drawer',
};
</script>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['collapse']);
const props = defineProps({
  absolute: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: Array,
    required: false,
    default: () => [],
  },
  width: {
    type: String,
    default: '',
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  open: {
    type: Boolean,
    default: false,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  rail: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: [String, Boolean],
    default: false,
  },
  bg: {
    type: String,
    default: '#f8fafd',
  },
  topGap: {
    type: String,
    default: '0px',
  },
  bottomGap: {
    type: String,
    default: '0px',
  },
});

const emitCollapse = () => {
  emit('collapse', false);
};

const widthStyle = computed(() => `width: ${props.width};`);
const bgStyle = computed(() => `background-color: ${props.bg};`);
const topGapStyle = computed(() => `top: ${props.topGap};`);
const bottomGapStyle = computed(() => `bottom: ${props.bottomGap};`);

const overlayClass = computed(() => [
  'opacity-50',
  'inset-0 z-30',
  'bg-BLACK-2 ',
  'transition-all duration-300',
  {
    'fixed ': props.fixed,
    'absolute ': props.absolute,
  },
]);

const containerClass = computed(() => [
  'ltr:text-left rtl:text-right',
  'flex flex-col',
  'text-BLACK-2',
  'transition-all duration-300',
  'overflow-auto',
  'overscroll-contain',
  'z-30',
  {
    'absolute ltr:left-0 rtl:right:0 bottom-0 top-0  ltr:border-r rtl:border-l border-BORDER':
      props.absolute && !props.right,
    'absolute end-0 bottom-0 top-0 ltr:border-l rtl:border-r border-BORDER':
      props.absolute && props.right,
    'relative h-full': !props.absolute && !props.fixed,
    'fixed start-0 bottom-0 top-0 ltr:border-r rtl:border-l border-BORDER':
      props.fixed && !props.right && !props.bottom,
    'fixed end-0 bottom-0 top-0 border-l border-BORDER':
      props.fixed && props.right,
    'fixed start-0 end-0 bottom-0 border-t border-BORDER':
      props.fixed && props.bottom,
    // '!w-0 border-r-0 overflow-auto overscroll-contain': !props.open,
    'ltr:-translate-x-full rtl:translate-x-full': !props.open && !props.right && !props.rail,
    'ltr:translate-x-full rtl:-translate-x-full': !props.open && props.right && !props.rail,
    'navigation-drawer-rail-negative':
      !props.open && !props.right && props.rail,
    'navigation-drawer-rail': !props.open && props.right && props.rail,
    'rounded-lg': props.rounded,
  },
  ...props.customClass,
]);
</script>
<style>
.navigation-drawer-rail {
  transform: translateX(calc(100% - 3.5rem));
}

.navigation-drawer-rail-negative {
  transform: translateX(calc(calc(100% * -1) + 3.5rem));
}
</style>
