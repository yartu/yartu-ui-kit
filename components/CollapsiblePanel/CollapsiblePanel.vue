<template>
  <teleport to="body">
    <div
      v-if="closed"
      :class="[containerClass, collaps ? 'h-[75vh]' : ' h-12']"
    >
      <div :class="headerClass" @click="collapseWindow()">
        <h1 class="subtitle-2">
          {{ title }}
        </h1>
        <div class="flex items-center justify-end gap-2">
          <i
            @click.stop="collapseWindow()"
            class="cursor-pointer rounded-full hover:bg-GREY-4 transition-all duration-300"
            aria-hidden="true"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 23H21C21.55 23 22 23.45 22 24C22 24.55 21.55 25 21 25H11C10.45 25 10 24.55 10 24C10 23.45 10.45 23 11 23Z"
                fill="#9AA1B4"
              />
            </svg>
          </i>
          <i
            @click.stop="closeWindow()"
            class="cursor-pointer rounded-full hover:bg-GREY-4 transition-all duration-300"
            aria-hidden="true"
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
          </i>
        </div>
      </div>
      <div class="mail-modal-content relative overflow-auto">
        <slot name="content"></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'y-collapsible-panel',
  data() {
    return {
      collaps: false,
      closed: true,
    };
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Collapsible panel',
    },
  },
  methods: {
    collapseWindow() {
      this.collaps = !this.collaps;
      this.$emit('collapse', this.collaps);
    },
    closeWindow() {
      this.closed = false;
      this.$emit('closed', this.closed);
    },
  },
  mounted() {
    this.collaps = this.collapse;
    this.closed = this.close;
  },
  computed: {
    containerClass() {
      return [
        'fixed',
        'bottom-0 start-0 end-0',
        'mx-auto',
        'w-[732px]',
        'rounded-t-lg',
        'overflow-hidden',
        'z-10',
        'bg-WHITE',
        'shadow-2',
        'transition-all duration-300',
      ];
    },
    headerClass() {
      return [
        'bg-LIGHTBLUE-3',
        'h-12',
        'flex justify-between items-center',
        'ps-7 pe-4 py-3',
      ];
    },
  },
  watch: {
    close(val) {
      this.closed = val;
    },
    collapse(val) {
      this.collaps = val;
    },
  },
};
</script>

<style>
.mail-modal-content {
  height: calc(100% - 48px);
}
</style>
