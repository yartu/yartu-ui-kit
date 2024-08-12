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
          id="modal-container"
          class="bg-white relative overflow-auto transition-all duration-200 modal-container"
          :class="[modalClass, escapeController ? 'scale-105' : '']"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
          @keydown="lorem"
        >
          <button
            v-if="closable"
            class="absolute end-4 z-10 top-4 w-8 h-8 rounded-full flex flex-wrap items-center justify-center hover:bg-GREY-8 bg-white"
            aria-label="closeModal"
            @click="
              $emit('update:modelValue', false);
              $emit('closed');
            "
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 11L21 21" stroke="#9AA1B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11 21L21 11" stroke="#9AA1B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
  name: 'y-modal',
};
</script>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '404px',
  },
  minWidth: {
    type: String,
    default: '404px',
    required: true,
  },
  maxHeight: {
    type: String,
    required: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  disableEsc: {
    type: Boolean,
    default: false,
  },
  modelValue: null,
  radius: {
    type: Boolean,
    required: false,
    default: () => true,
  },
});

const emit = defineEmits(['closed', 'update:modelValue']);

const escapeController = ref(false);
const minModalWith = ref(props.minWidth);
const maxModalWith = ref(props.maxWidth);
const modalMaxHeight = ref(props.maxHeight && !props.fullScreen ? props.maxHeight : '');

const containerClass = computed(() => {
  return [
    'safe-area-margin-y overflow-x-hidden overflow-y-auto',
    'fixed',
    'inset-0 z-50',
    'outline-none',
    'focus:outline-none',
    'flex justify-center items-center',
  ];
});

const modalClass = computed(() => {
  return [props.radius ? 'rounded-xl' : ''];
});

const keypress = (e) => {
  if (e.key === 'Escape' && !props.disableEsc) {
    emit('update:modelValue', false);
    emit('closed');
  }
  if (e.key === 'Escape' && props.disableEsc) {
    escapeController.value = true;
    setTimeout(() => {
      escapeController.value = false;
    }, 100);
  }
};

onMounted(async () => {
  window.addEventListener('keyup', keypress);
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', keypress);
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
