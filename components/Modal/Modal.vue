<template>
  <Teleport to="body">
    <Transition name="fade">
      <div :class="containerClass">
        <div
          class="bg-white rounded-xl relative"
          :style="widthStyle"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <button
            class="absolute right-4 z-1 top-4 w-8 h-8 rounded-full flex flex-wrap items-center justify-center hover:bg-GREY-8"
            aria-label="closeModal"
            @click="$emit('close')"
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
    width: {
      type: String,
      default: '404px',
    },
  },
  computed: {
    containerClass() {
      return [
        'overflow-x-hidden overflow-y-auto',
        'fixed',
        'inset-0 z-51',
        'outline-none',
        'focus:outline-none',
        'flex justify-center items-center',
      ];
    },
    widthStyle() {
      return `width: ${this.width};`;
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
