<template>
  <div :class="containerClass">
    <div v-if="dropdownStatus" :style="bgStyle" :class="[flexClass, dropdownStatus ? 'flex' : 'hidden']">
      <div :class="contentClass">
        <ol>
          <slot />
        </ol>
      </div>
    </div>
    <slot name="activator" :open="openDropdown">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown',
  data: () => ({
    open: false,
  }),
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: '#ffffff',
    },
    left: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dropdownStatus() {
      return this.show || this.open;
    },
    bgStyle() {
      return `background-color: ${this.bg};`;
    },
    containerClass() {
      return ['relative', 'inline-block'];
    },
    flexClass() {
      return ['absolute z-7'];
    },
    contentClass() {
      return [
        'dropdown-content',
        'shadow-1',
        'absolute z-1 top-full mt-4',
        'py-2',
        'bg-WHITE',
        'text-sm font-semibold text-BLACK-2',
        'flex flex-col max-w-[232px] w-[232px]',
        'border-BORDER border rounded-lg',
        'transition-all duration-300',
        {
          '-translate-x-full': this.left,
        },
      ];
    },
  },
  methods: {
    openDropdown() {
      this.open = !this.open;
    },
  }
};
</script>

<style></style>
