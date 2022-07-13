<template>
  <div :class="cardClass">
    <div
      class="file-card-image w-8 h-8 inline-flex items-center justify-center relative"
    >
      <div class="img-container transition-all duration-500">
        <slot name="img"></slot>
      </div>
    </div>
    <div class="flex-1">
      <slot name="content"></slot>
    </div>
    <div class="file-card-btn m-2 opacity-0 transition-all duration-500">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-small-card',
  props: {},
  computed: {
    cardClass() {
      return [
        'w-63 h-16',
        'p-4',
        'relative',
        'border border-BORDER',
        'rounded-lg',
        'flex items-center gap-2',
        'hover:shadow-xl',
        'hover:truncate',
        'cursor-pointer',
        'transition duration-300',
        'file-card',
      ];
    },
  },
};
</script>

<style>
.file-card:hover .file-card-image > .check {
  opacity: 1;
}
.file-card:hover .file-card-image > .img-container {
  opacity: 0;
}
.file-card:hover .file-card-btn {
  opacity: 1;
}
</style>
