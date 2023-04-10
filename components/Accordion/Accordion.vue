<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <i v-if="prefix != ''" :class="prefix" aria-hidden="true"></i>
      <span :class="!hr ? 'flex-1' : ''">
        {{ title }}
      </span>
      <hr v-if="hr" class="grow text-BORDER" />
      <button
        @click="toggleOpen"
        :class="[btnClass, open ? 'rotate-90' : '']"
      >
        <i v-if="icon != ''" :class="icon" aria-hidden="true"></i>
      </button>
    </div>
    <transition name="fade">
      <div v-show="open" :class="[contentClass]">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'y-accordion',
  data() {
    return {
      open: false,
    };
  },
  props: {
    title: {
      type: String,
      default: 'Accordion',
    },
    prefix: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    hr: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['collapse'],
  computed: {
    containerClass() {
      return [
        'w-full',
        {
          'overflow-hidden': !this.open,
        },
      ];
    },
    contentClass() {
      return [
        'transition-all duration-300',
      ];
    },
    btnClass() {
      return [
        'hover:bg-GREY-2',
        'border border-BORDER',
        'rounded-full',
        'h-6 w-6',
        'transition-all duration-300',
        'text-sm text-GREY-1',
        'inline-flex items-center justify-center',
      ];
    },
    headerClass() {
      return [
        'flex items-center justify-between',
        'text-base',
        'font-semibold',
        'text-BLACK-2',
        {
          'gap-2': this.prefix && !this.hr,
          'gap-4': this.hr,
        },
      ];
    },
  },
  methods: {
    toggleOpen () {
      this.open = !this.open;
      this.$emit('collapse', this.open);
    },
  },
  mounted() {
    this.open = !this.collapse;
  },
};
</script>
