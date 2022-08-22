<template>
  <div ref="target" :class="containerClass">
    <teleport to="body">
      <transition name="fade">
        <div
          ref="dropdownContent"
          v-show="dropdownStatus"
          :style="bgStyle"
          :class="[contentClass, dropdownStatus ? 'flex' : 'hidden']"
        >
          <ol>
            <slot />
          </ol>
        </div>
      </transition>
    </teleport>
    <slot name="activator" :open="openDropdown"> </slot>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown',
};
</script>

<script setup>
import { computed, useSlots, ref, onUnmounted, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

const open = ref(false);
const target = ref(null);
const dropdownContent = ref(null);
const slots = useSlots();

onClickOutside(target, () => (open.value = false));

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: String,
    default: '#ffffff',
  },
  left: {
    type: Boolean,
    default: false,
  },
});

function openDropdown() {
  open.value = !open.value;
  calculatePosition();
}

const calculatePosition = () => {
  // improve this @aziz
  let dropdownContainer = target.value.getBoundingClientRect();
  dropdownContent.value.style.top = dropdownContainer.bottom + 6 + 'px';
  dropdownContent.value.style.left = dropdownContainer.right + 'px';
};

const dropdownStatus = computed(() => {
  return props.show || open.value;
});

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const bgStyle = computed(() => {
  return `background-color: ${props.bg};`;
});

const containerClass = computed(() => {
  return [
    'relative',
    {
      block: props.block,
      'inline-block': !props.block,
    },
  ];
});

const contentClass = computed(() => {
  return [
    'dropdown-content',
    'shadow-1',
    'fixed z-1001 mt-1.5',
    'py-2',
    'bg-WHITE',
    'text-sm font-semibold text-BLACK-2',
    'flex flex-col max-w-[232px] w-[232px]',
    'border-BORDER border rounded-lg',
    {
      '-translate-x-full': props.left,
    },
  ];
});
</script>
