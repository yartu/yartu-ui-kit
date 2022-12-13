<template>
  <div :class="containerClass">
    <div :class="contentClass">
      <div v-if="prefixBtn || postfixBtn" :class="actionsClass">
        <span v-if="prefixBtn" :class="buttonClass">
          <slot name="prefixBtn"></slot>
        </span>
        <span v-if="postfixBtn" :class="buttonClass">
          <slot name="postfixBtn"></slot>
        </span>
      </div>
      <slot name="content"></slot>
    </div>
    <div v-if="shape" :class="bottomShapeClass">
      <slot name="shape"></slot>
    </div>
    <div :class="textClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-shaped-card',
  props: {
    prefixBtn: {
      type: Boolean,
      default: true,
    },
    postfixBtn: {
      type: Boolean,
      default: true,
    },
    shape: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    containerClass() {
      return [
        'h-56',
        'relative',
        'rounded-md border border-BORDER',
        'flex',
        'hover:shadow-1',
        'cursor-pointer',
        'transition duration-300',
        'drive-card',
        'p-2',
        'bg-LIGHTBLUE-7',
      ];
    },
    bottomShapeClass() {
      return [
        'absolute',
        'flex flex-wrap items-center justify-end',
        'h-[24px] w-[98px]',
        'bg-white',
        'px-2',
        'bottom-[70px]',
        'right-0',
        'z-1',
        'shape-path',
      ];
    },
    contentClass() {
      return ['h-52', 'w-full', 'relative'];
    },
    textClass() {
      return [
        'bg-white',
        'flex flex-row gap-3',
        'absolute',
        'bottom-0 left-0 right-0',
        'h-17 w-full',
        'text-left',
        'p-4',
        'rounded-b-md',
      ];
    },
    buttonClass() {
      return [
        'opacity-0',
        'w-8 h-8',
        'flex flex-wrap items-center justify-center',
        'rounded-full',
        'transition duration-500 ease-in-out',
        'text-center',
        'overflow-hidden',
        'drive-card-buttons',
      ];
    },
    actionsClass() {
      return ['w-full h-8', 'absolute', 'flex justify-between'];
    },
  },
};
</script>

<style>
.drive-card:hover .drive-card-buttons {
  opacity: 1;
}

.shape-path {
  clip-path: path(
    'M11.4387 3.11753C12.4917 1.19519 14.5091 0 16.7009 0H98V24H0L11.4387 3.11753Z'
  );
}
</style>
