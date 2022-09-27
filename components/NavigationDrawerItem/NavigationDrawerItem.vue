<template>
  <button :class="containerClass">
    <i
      v-if="prefix != ''"
      :class="[prefix, prefixClass]"
      aria-hidden="true"
    ></i>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'y-navigation-drawer-item',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  computed: {
    containerClass() {
      return [
        'flex items-center gap-2',
        'w-full',
        'cursor-pointer',
        'relative',
        'hover:bg-LIGHTBLUE-7',
        'py-2 px-6',
        'text-BLACK-2 font-semibold text-sm',
        {
          'before:absolute before:left-0 before:w-[3px] before:h-[36px] before:bg-BLUE before:rounded-r-md !text-BLUE bg-GREY-3':
            this.active,
        },
      ];
    },
    prefixClass() {
      return [
        'text-GREY-1',
        {
          'text-BLUE': this.active,
        },
      ];
    },
  },
};
</script>

<style></style>
