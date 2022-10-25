<template>
  <div class="w-full">
    <button @click="open = !open" :class="headerClass">
      <span class="flex items-center text-xs">
        <i
          v-if="toggleIcon != ''"
          class="transition-all duration-300 px-1"
          :class="[
            open ? 'rotate-90' : '',
            active ? '!text-BLUE' : 'text-GREY-1',
            toggleIcon,
          ]"
          aria-hidden="true"
        >
        </i>
      </span>
      <span class="flex items-center text-GREY-1">
        <i
          v-if="prefix != ''"
          :class="[prefix, prefixClass]"
          aria-hidden="true"
        ></i>
        <p :class="titleClass">
          {{ title }}
        </p>
      </span>
      <div class="ml-auto pr-6 flex items-center">
        <slot name="postfix"></slot>
      </div>
    </button>
    <div
      :class="[
        contentClass,
        open
          ? 'max-h-[148px] overflow-y-auto before:h-[32px]'
          : 'max-h-0 border-none overflow-hidden before:hidden',
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown-drawer',
  data() {
    return {
      open: true,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    active: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: '',
    },
    toggleIcon: {
      type: String,
      default: '',
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headerClass() {
      return [
        'flex items-center',
        'relative',
        'w-full',
        'pl-1 py-2',
        'text-BLACK-2',
        'hover:bg-GREY-3',
        'focus:outline-none',
        {
          'before:absolute content-none before:left-0 before:w-[3px]  before:h-[32px] before:bg-BLUE before:rounded-r-md !text-BLUE bg-BLUE/[.12]':
            this.active,
        },
      ];
    },
    contentClass() {
      return [
        'relative',
        'border-y border-BORDER',
        'transition-all duration-300',
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
    titleClass() {
      return [
        'ml-2',
        'text-sm font-semibold text-BLACK-2 capitalize',
        {
          'text-BLUE': this.active,
        },
      ];
    },
  },
  mounted() {
    this.open = !this.collapse;
  },
};
</script>

<style></style>
