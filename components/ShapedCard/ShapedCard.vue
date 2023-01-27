<template>
  <div :class="containerClass">
    <div :class="contentClass">
      <div v-if="suffixBtn || prefixBtn" :class="actionsClass">
        <span v-if="prefixBtn" :class="buttonClass">
          <slot name="prefixBtn"></slot>
        </span>
        <div class="flex items-center gap-2">
          <span v-if="suffixBtn" :class="buttonClass">
            <slot name="suffixBtn"></slot>
          </span>
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
  suffixBtn: {
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
});

const contentClass = computed(() => ["h-52", "w-full", "relative"]);

const containerClass = computed(() => [
  "drive-card",
  "h-56",
  "relative",
  "rounded-md border border-BORDER",
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
  "bg-white",
  "flex flex-row gap-3",
  "absolute",
  "bottom-0 left-0 right-0",
  "h-17 w-full",
  "text-left",
  "p-4",
  "rounded-b-md",
]);
const buttonClass = computed(() => [
  "drive-card-buttons",

  "w-8 h-8",
  "flex flex-wrap",
  "items-center justify-center",
  "rounded-full",
  "transition duration-500 ease-in-out",
  "text-center",
  "overflow-hidden",
  {
    "opacity-0": !props.showActions,
    "opacity-1": props.showActions,
  },
]);

const actionsClass = computed(() => [
  "w-full h-8",
  "absolute",
  "z-1",
  "flex justify-between",
]);
</script>

<style>
.drive-card:hover .drive-card-buttons {
  opacity: 1;
}

.shape-path {
  clip-path: path(
    "M11.4387 3.11753C12.4917 1.19519 14.5091 0 16.7009 0H98V24H0L11.4387 3.11753Z"
  );
}
</style>
