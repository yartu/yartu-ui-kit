<template>
  <div ref="target" :class="containerClass">
    <div
      v-if="dropdownStatus"
      :style="bgStyle"
      :class="[contentClass, dropdownStatus ? 'flex' : 'hidden']"
    >
      <ol>
        <slot/>
      </ol>
    </div>
    <slot name="activator" :open="openDropdown"> </slot>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown',
};
</script>

<script setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const open = ref(false);
const target = ref(null);

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
}

const dropdownStatus = computed(() => {
  return props.show || open.value;
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
    'absolute z-50 top-full mt-1.5',
    'py-2',
    'bg-WHITE',
    'text-sm font-semibold text-BLACK-2',
    'flex flex-col max-w-[232px] w-[232px]',
    'border-BORDER border rounded-lg',
    'transition-all duration-300',
    {
      'right-0': props.left,
    },
  ];
});
</script>

<style></style>
