<template>
  <button :class="buttonClass" :disabled="disabled" type="button">
    <span v-if="loading" class="me-2">
      <svg
        class="animate-spin h-5 w-5"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="spinnerBg"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 5.25C8.24672 5.25 5.25 8.24672 5.25 12C5.25 15.7533 8.24672 18.75 12 18.75C15.7533 18.75 18.75 15.7533 18.75 12C18.75 8.24672 15.7533 5.25 12 5.25ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        />
        <path
          :fill="spinnerColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.75 12C18.75 8.27208 15.7279 5.25 12 5.25V3C16.9706 3 21 7.02944 21 12H18.75Z"
        />
      </svg>
    </span>
    <i
      v-else-if="icon != ''"
      :class="icon"
      aria-hidden="true"
      :style="iconColor !== 'none' ? `'color: ${iconColor};'` : ''"
    ></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'y-button',
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  },
  tertiary: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, Array],
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  app: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  spinnerBg: {
    type: String,
    default: '#f8fafd',
  },
  spinnerColor: {
    type: String,
    default: '#3663f2',
  },
  iconColor: {
    type: String,
    default: 'none',
  },
});

const buttonClass = computed(() => [
  'font-semibold text-sm',
  'rounded-lg',
  'transition-all duration-300',
  'inline-flex items-center justify-center',
  'disabled:cursor-not-allowed',
  {
    'bg-BLUE text-white hover:bg-HOVER-BLUE disabled:bg-LIGHTBLUE-3': props.primary,
    'border border-BORDER bg-white text-BLUE hover:bg-LIGHTBLUE-5 disabled:bg-GREY-3': props.secondary,
    'bg-BLACK-2 text-white hover:bg-BLACK-3 disabled:bg-GREY-3 disabled:border-BORDER disabled:border': props.tertiary,
    'bg-RED text-white hover:bg-RED-3 disabled:opacity-50': props.error,
    'bg-GREEN text-white hover:bg-GREEN-2 disabled:opacity-50': props.success,
    'text-BLUE hover:underline disabled:text-GREY-3 !p-0': props.text,

    'h-10 py-2 px-7': props.size == 'lg',
    'h-9 py-2 px-3': props.size == 'md',
    'h-8 py-1 px-3': props.size == 'sm',
    'h-6 py-1 px-3': props.size == 'xs',

    'w-10 h-10 !p-0': props.square && props.size == 'lg',
    'w-9 h-9 !p-0': props.square && props.size == 'md',
    'w-8 h-8 !p-0': props.square && props.size == 'sm',
    'w-6 h-6 !p-0': props.square && props.size == 'xs',

    'w-10 h-10 !p-0 !rounded-full hover:bg-GREY-8': props.circle && props.size == 'lg',
    'w-9 h-9 !p-0 !rounded-full hover:bg-GREY-8': props.circle && props.size == 'md',
    'w-8 h-8 !p-0 !rounded-full hover:bg-GREY-8': props.circle && props.size == 'sm',
    'w-6 h-6 !p-0 !rounded-full hover:bg-GREY-8': props.circle && props.size == 'xs',
    'w-4 h-4 !p-0 !rounded-full hover:bg-GREY-8': props.circle && props.size == '2xs',

    'bg-LIGHTBLUE-3 hover:bg-LIGHTBLUE-3': props.loading && props.primary,
    'bg-GREY-3 hover:bg-GREY-3': props.loading && (props.secondary || props.tertiary),
    'transition-none outline-LIGHTBLUE-5 outline-2 hover:outline': props.app,
    'bg-LIGHTBLUE-5 outline-2 border-2 outline border-BLUE outline-LIGHTBLUE-5': props.app && props.active,
  },
]);
</script>
