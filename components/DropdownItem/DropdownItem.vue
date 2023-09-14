<template>
  <li
    :class="containerClass"
    :disabled="disabled"
    @mouseover="$emit('hover', true)"
    @mouseleave="$emit('hover', false)"
    role="button"
  >
    <slot name="prefix">
      <i
        v-if="prefix"
        class="w-6 h-6 text-2xl leading-6"
        :class="prefix"
        aria-hidden="true"
      >
      </i>
    </slot>
    <div class="flex-1">
      <slot />
    </div>
    <slot name="suffix">
      <i
        v-if="suffix"
        class="w-6 h-6 !leading-6"
        :class="suffix"
        aria-hidden="true"
      >
      </i>
    </slot>
  </li>
</template>

<script>
export default {
  name: 'y-dropdown-item',
  emits: ['hover'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: [String, Array],
      default: '',
    },
    suffix: {
      type: [String, Array],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerClass() {
      return [
        'dropdown-item',
        'flex flex-row items-center justify-between gap-2',
        'pl-5 py-3 pr-2',
        'relative',
        'cursor-pointer',
        'hover:bg-GREY-3',
        {
          'bg-GREY-3': this.active,
          'select-none cursor-not-allowed opacity-20 hover:!bg-white pointer-events-none':
            this.disabled,
        },
      ];
    },
  },
};
</script>

<style>
.dropdown-item:hover > div > .dropdown-inner-container {
  display: inline-block;
}
</style>
