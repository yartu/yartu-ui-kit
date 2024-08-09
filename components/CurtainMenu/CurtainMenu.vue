<template>
  <div
    v-if="collapse"
    class="opacity-50 absolute inset-0 z-inherit bg-BLACK-2"
  ></div>
  <div
    ref="target"
    :class="[containerClass]"
    :style="[collapse ? openHeightStyle : heightStyle]"
  >
    <slot name="title" :open="open">
      <div class="flex flex-row items-center mb-3 subtitle-3">
        <p>{{ title }}</p>
        <button
          @click="open"
          class="ms-auto hover:bg-LIGHTBLUE-6 border text-xs border-gray-200 rounded-full h-[28px] w-[28px] inline-flex items-center justify-center m-0.5"
        >
          <span
            class="transition-all duration-300"
            :class="collapse ? 'rotate-180' : ''"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 9L8 5L12 9L4 9Z" fill="#9AA1B4" />
            </svg>
          </span>
        </button>
      </div>
    </slot>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'y-curtain-menu',
};
</script>

<script setup>
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

const collapse = ref(false);
const target = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  height: {
    type: String,
    default: '175px',
  },
  openHeight: {
    type: String,
    default: '434px',
  },
});

onClickOutside(target, () => {
  collapse.value = false;
});

const open = () => {
  collapse.value = !collapse.value;
};

const openHeightStyle = computed(() => `height: ${props.openHeight}`);
const heightStyle = computed(() => `height: ${props.height}`);
const containerClass = computed(() => [
  'mt-auto',
  'absolute',
  'bg-WHITE',
  'border-t border-BORDER',
  'z-inherit',
  'overflow-hidden',
  'start-0 end-0 bottom-0',
  'transition-all duration-300',
  'pt-5 px-4 pb-1',
]);
</script>
