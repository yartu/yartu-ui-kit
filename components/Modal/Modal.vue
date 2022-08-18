<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" :class="containerClass">
        <div
          class="bg-white rounded-xl relative min-h-80 overflow-auto"
          :style="widthStyle"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <button
            v-if="closable"
            class="absolute right-4 z-10 top-4 w-8 h-8 rounded-full flex flex-wrap items-center justify-center hover:bg-GREY-8"
            aria-label="closeModal"
            @click="$emit('update:modelValue', false); $emit('closed')"
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
    </Transition>
  </Teleport>
</template>
<script>
export default {
  name: 'y-modal',
  props: {
    maxWidth: {
      type: String,
      default: '404px',
    },
    minWidth: {
      type: String,
      default: '404px',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    modelValue: null,
  },
  emits: ['closed', 'update:modelValue'],
  computed: {
    containerClass() {
      return [
        'overflow-x-hidden overflow-y-auto',
        'fixed',
        'inset-0 z-50',
        'outline-none',
        'focus:outline-none',
        'flex justify-center items-center',
      ];
    },
    widthStyle() {
      return [`min-width: ${this.minWidth};`, `max-width: ${this.maxWidth};`];
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
