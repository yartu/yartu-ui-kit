<template>
  <div class="flex flex-col w-full">
    <div
      v-for="(item, index) of value"
      :key="index"
      class="flex flex-row relative min-h-16"
    >
      <div v-if="align !== 'left'" class="flex-1 px-4 relative -top-1.5">
        <slot name="content-left" :item="item" :index="index"></slot>
      </div>
      <div class="flex flex-col items-center gap-2">
        <slot name="marker" :item="item" :index="index">
          <div class="w-2 h-2 bg-BLACK-2 rounded-full"></div>
        </slot>
        <slot
          v-if="index !== value.length - 1"
          name="connector"
          :item="item"
          :index="index"
        >
          <div class="w-px flex-1 bg-BORDER mb-2"></div>
        </slot>
      </div>
      <div class="flex-1 px-4 relative -top-1.5">
        <slot name="content-right" :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-timeline',
};
</script>
<script setup>
defineProps({
  value: null,
  align: {
    mode: String,
    default: 'left',
  },
  layout: {
    mode: String,
    default: 'vertical',
  },
});
</script>
