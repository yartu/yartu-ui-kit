<template>
  <div :class="containerClass">
    <div :class="contentClass">
      <div v-if="postfixBtn || prefixBtn" :class="actionsClass">
        <div v-if="prefixBtn" class="flex items-center gap-1">
          <slot name="prefixBtn"></slot>
        </div>
        <div v-if="postfixBtn" class="flex items-center gap-1">
          <slot name="postfixBtn"></slot>
        </div>
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
  name: "y-shaped-card",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  postfixBtn: {
    type: Boolean,
    default: true,
  },
  prefixBtn: {
    type: Boolean,
    default: true,
  },
  shape: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const contentClass = computed(() => ["h-52", "w-full", "relative"]);

const containerClass = computed(() => [
  "drive-card",
  "h-56",
  "relative",
  "rounded-md border",
  {
    "border-BLUE bg-BLUE-3": props.selected,
    "border-BORDER": !props.selected,
  },
  "flex",
  "hover:shadow-1",
  "cursor-pointer",
  "transition duration-300",
  "p-2",
  "bg-LIGHTBLUE-7",
]);

const bottomShapeClass = computed(() => [
  "absolute",
  "flex flex-wrap items-center justify-end",
  "h-[24px] w-[98px]",
  "bg-white",
  "px-2",
  "bottom-[70px]",
  "right-0",
  "z-1",
  "shape-path",
]);

const textClass = computed(() => [
  {
    "bg-white": !props.selected,
    "bg-BLUE-3": props.selected,
  },
  "flex flex-row gap-3",
  "absolute",
  "bottom-0 left-0 right-0",
  "h-17 w-full",
  "text-left",
  "p-4",
  "rounded-b-md",
]);

const actionsClass = computed(() => [
  "drive-card-actions",
  "w-full h-8",
  "absolute",
  "transition duration-500 ease-in-out",
  "z-1",
  "flex justify-between",
  {
    "opacity-0": !props.showActions,
    "opacity-1": props.showActions,
  },
]);
</script>

<style>
.drive-card:hover .drive-card-actions {
  opacity: 1;
}

.shape-path {
  clip-path: path(
    "M11.4387 3.11753C12.4917 1.19519 14.5091 0 16.7009 0H98V24H0L11.4387 3.11753Z"
  );
}
</style>
