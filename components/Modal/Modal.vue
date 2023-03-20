<template>
  <teleport to="body">
    <transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition-all duration-500"
      leave-active-class="transition-all duration-500"
    >
      <div v-if="modelValue" :class="containerClass">
        <div
          class="bg-white relative overflow-auto modal-container"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <button
            v-if="closable"
            class="absolute right-4 z-10 top-4 w-8 h-8 rounded-full flex flex-wrap items-center justify-center hover:bg-GREY-8"
            aria-label="closeModal"
            @click="
              $emit('update:modelValue', false);
              $emit('closed');
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 11L21 21"
                stroke="#9AA1B4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11 21L21 11"
                stroke="#9AA1B4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div>
            <slot></slot>
          </div>
        </div>
        <div class="fixed inset-0 -z-1 bg-BLACKOVERLAY"></div>
      </div>
    </transition>
  </teleport>
</template>
<script>
export default {
  name: "y-modal",
};
</script>
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "404px",
  },
  minWidth: {
    type: String,
    default: "404px",
  },
  maxHeight: {
    type: String,
    required: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  modelValue: null,
});

const emit = defineEmits(["closed", "update:modelValue"]);

const minModalWith = ref(props.minWidth);
const maxModalWith = ref(props.maxWidth);
const modalMaxHeight = ref(
  props.maxHeight && !props.fullScreen ? props.maxHeight : ""
);

const containerClass = computed(() => {
  return [
    "overflow-x-hidden overflow-y-auto",
    "fixed",
    "inset-0 z-50",
    "outline-none",
    "focus:outline-none",
    "flex justify-center items-center",
  ];
});
</script>
<style scoped>
@media screen and (min-width: 1024px) {
  .modal-container {
    min-width: v-bind(minModalWith) !important;
    max-width: v-bind(maxModalWith) !important;
    max-height: v-bind(modalMaxHeight) !important;
    width: auto !important;
    height: auto !important;
    border-radius: 12px;
  }
}
.modal-container {
  min-width: 100%;
  max-width: none;
  max-height: none;
  width: 100%;
  height: 100%;
}
</style>
