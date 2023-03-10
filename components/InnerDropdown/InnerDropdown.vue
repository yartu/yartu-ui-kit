<template>
  <div :class="containerClass">
    <div :class="contentClass" :style="bgStyle">
      <ol>
        <slot />
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "y-inner-dropdown",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  bg: {
    type: String,
    default: "#ffffff",
  },
  left: {
    type: Boolean,
    default: false,
  },
});

const bgStyle = computed(() => {
  return `background-color: ${props.bg};`;
});

const containerClass = computed(() => {
  return [
    "dropdown-inner-container",
    "absolute z-1 top-0",
    "hidden",
    "-mt-5",
    {
      "pr-3 right-full": props.left,
      "pl-3 left-full": !props.left,
    },
  ];
});

const contentClass = computed(() => {
  return [
    "shadow-1",
    "relative z-1 top-full mt-3",
    "py-2",
    "bg-WHITE",
    "text-sm font-semibold text-BLACK-2",
    "flex flex-col max-w-[232px] w-[232px]",
    "border-BORDER border rounded-lg",
    "transition-all duration-300",
  ];
});
</script>
<style></style>
