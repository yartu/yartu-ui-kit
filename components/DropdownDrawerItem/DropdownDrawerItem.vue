<template>
  <button :class="containerClass">
    <i
      v-if="prefix != ''"
      :class="[prefix, prefixClass]"
      :style="'color:' + iconColor + '!important;'"
      aria-hidden="true"
    ></i>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'y-dropdown-drawer-item',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '#394c66',
    },
  },
  computed: {
    containerClass() {
      return [
        'w-full',
        'flex items-center ',
        'text-xs',
        'text-left',
        'text-BLACK-2',
        'font-semibold',
        'hover:bg-GREY-3',
        'p-2',
        {
          'before:absolute content-none before:left-0 before:w-[3px] before:h-[32px] before:bg-BLUE before:rounded-r-md !text-BLUE bg-BLUE/[.12]':
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
