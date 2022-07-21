<template>
  <span tabindex="0" :class="chipContainerClass">
    <slot></slot>
    <button v-if="close" :class="closeBtnClass" @click="$emit('close')">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.66797 4.66602L11.3346 11.3327"
          stroke="#9AA1B4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.66797 11.3327L11.3346 4.66602"
          stroke="#9AA1B4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </span>
</template>

<script>
export default {
  name: 'y-chip',
  props: {
    close: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    chipContainerClass() {
      return [
        'border border-BORDER',
        'rounded-lg',
        'relative',
        'cursor-pointer',
        'p-1',
        'h-8',
        'inline-flex items-center',
        'text-BLACK-2',
        'bg-LIGHTBLUE-6',
      ];
    },
    closeBtnClass() {
      return [
        'rounded-full',
        'relative',
        'cursor-pointer',
        'h-4 w-4',
        'inline-flex items-center justify-center',
        'text-BLACK-2',
        'bg-LIGHTBLUE-6',
      ];
    },
  },
};
</script>
