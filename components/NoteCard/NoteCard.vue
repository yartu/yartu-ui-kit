<template>
  <div :class="containerClass">
    <div :class="noteCardCheckboxClass">
      <slot name="prefixBtn"></slot>
    </div>
    <div class="overflow-hidden">
      <div class="min-w-[262px] p-2 pt-[10px] relative rounded-lg">
        <div :class="pinButtonClass">
          <slot name="postfixBtn"></slot>
        </div>
        <div :class="noteCardTitle">
          <slot name="title"></slot>
        </div>
        <div :class="contentClass">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
    <div v-if="!disableBulkAction" :class="bulkActionClass">
      <slot name="bulkAction"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-note-card',
  props: {
    disableBulkAction: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerClass() {
      return [
        'relative',
        'rounded-[10px]',
        'bg-YELLOW',
        'yartu-note-card-container',
        'cursor-pointer',
        {
          'hover:!rounded-bl-none': !this.disableBulkAction,
        },
      ];
    },
    contentClass() {
      return ['bg-white', 'rounded-lg', 'text-xs', 'p-3 pt-2', 'mt-[10px]'];
    },
    bulkActionClass() {
      return [
        'bg-BLACK-1',
        'absolute bottom-0 z-[3]',
        'rounded-b-lg',
        'overflow-hidden',
        'text-GREY-1',
        'transition-all duration-500',
        'px-3',
        'flex flex-row flex-wrap gap-2 items-center justify-center',
        'max-h-8 h-0 max-w-[60px] min-w-fit',
        'yartu-note-card-bulk-actions',
      ];
    },
    pinButtonClass() {
      return [
        'absolute',
        'w-8 h-8',
        'opacity-0',
        'z-[2]',
        'text-white',
        'flex items-center justify-center',
        '-top-1 -end-1',
        'transition-all duration-500',
        'note-card-pin-button',
      ];
    },
    noteCardTitle() {
      return ['text-base text-white font-semibold'];
    },
    noteCardCheckboxClass() {
      return [
        'absolute',
        'z-[2]',
        'transition-all duration-500',
        'opacity-0',
        '-start-2 -top-2',
        'yartu-note-card-checkbox',
      ];
    },
  },
};
</script>

<style>
.yartu-note-card-container:hover > .yartu-note-card-bulk-actions {
  bottom: -2rem /* -32px */;
  height: 2rem /* 32px */;
}

.yartu-note-card-container:hover > .yartu-note-card-checkbox {
  opacity: 1;
}

.yartu-note-card-container:hover .note-card-pin-button {
  opacity: 1;
}
</style>
