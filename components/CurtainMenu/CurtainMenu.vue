<template>
  <div
    v-if="open"
    class="opacity-50 absolute inset-0 z-inherit bg-BLACK-2"
    @click="open = !open"
  ></div>
  <div
    :class="[containerClass]"
    :style="[open ? openHeightStyle : heightStyle]"
  >
    <div class="text-sm flex flex-row items-center mb-3 font-extrabold">
      <p>{{ title }}</p>
      <button
        @click="open = !open"
        class="ml-auto hover:bg-gray-100 border text-xs border-gray-200 rounded-full h-[28px] w-[28px] inline-flex items-center justify-center m-0.5;"
      >
        <span
          class="transition-all duration-300"
          :class="open ? 'rotate-180' : ''"
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
    <slot />
  </div>
</template>

<script>
export default {
  name: 'y-curtain-menu',
  data() {
    return {
      open: false,
    };
  },
  props: {
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
  },
  computed: {
    openHeightStyle() {
      return `height: ${this.openHeight}`;
    },
    heightStyle() {
      return `height: ${this.height}`;
    },
    containerClass() {
      return [
        'mt-auto',
        'absolute',
        'bg-WHITE',
        'border-t border-BORDER',
        'z-inherit',
        'overflow-hidden',
        'left-0 right-0 bottom-0',
        'transition-all duration-300',
        'pt-5 px-4 pb-1',
      ];
    },
  },
};
</script>

<style></style>
