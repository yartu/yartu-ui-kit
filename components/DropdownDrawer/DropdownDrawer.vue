<template>
  <div class="w-full">
    <div @click="open = !open" :class="headerClass">
      <span class="flex items-center text-xs">
        <i
          v-if="toggleIcon != ''"
          class="transition-all duration-300 px-1"
          :class="[open ? 'rotate-90' : '', active ? '!text-BLUE' : 'text-GREY-1', toggleIcon]"
          aria-hidden="true"
        >
        </i>
      </span>
      <div class="flex items-center text-GREY-1 flex-1 break-all">
        <i v-if="prefix != ''" :class="[prefix, prefixClass]" aria-hidden="true"></i>
        <slot name="title">
          <p :class="titleClass" style="width: calc(100% - 1rem)">
            {{ title }}
          </p>
        </slot>
      </div>
      <div class="ml-auto pr-6 flex items-center">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div :class="[contentClass]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown-drawer',
};
</script>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  active: {
    type: Boolean,
    default: false,
  },
  prefix: {
    type: String,
    default: '',
  },
  toggleIcon: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  expandContent: {
    type: Boolean,
    default: false,
  },
});

const open = ref(!props.collapse);

const headerClass = computed(() => {
  return [
    'flex items-center',
    'relative',
    'w-full',
    'cursor-pointer',
    'pl-1 py-2',
    'text-BLACK-2',
    'hover:bg-GREY-3',
    'focus:outline-none',
    {
      'before:absolute content-none before:left-0 before:w-[3px]  before:h-[32px] before:bg-BLUE before:rounded-r-md !text-BLUE bg-BLUE/[.12]':
        props.active,
    },
  ];
});

const contentClass = computed(() => {
  return [
    'relative',
    'border-y border-BORDER',
    'transition-all duration-300',
    {
      'overflow-y-auto lg:overflow-hidden hover:overflow-y-auto before:h-[32px]': open.value,
      'max-h-[148px]' : open.value && !props.expandContent,
      'max-h-0 border-none overflow-hidden before:hidden': !open.value,
    },
  ];
});

const prefixClass = computed(() => {
  return [
    'text-GREY-1',
    {
      'text-BLUE': props.active,
    },
  ];
});

const titleClass = computed(() => {
  return [
    'ml-2',
    'truncate',
    'text-sm font-semibold text-BLACK-2 capitalize',
    {
      'text-BLUE': props.active,
    },
  ];
});
</script>

<style></style>
