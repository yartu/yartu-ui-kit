<template>
  <transition name="slidedown">
    <div
      ref="bottomSheetContent"
      v-show="bottomSheetStatus"
      class="w-full h-full fixed bottom-0 left-0 z-1001 flex flex-col bg-BLACKOVERLAY"
    >
      <div class="overlay flex-1 min-h-[40%] w-full"></div>
      <div
        class="items h-fit max-h-[60%] w-full rounded-t-lg py-2 overflow-hidden relative"
        :style="bgStyle"
      >
      <div class="w-full relative h-full overflow-y-scroll">
        <slot />
      </div>
        <div
          class="stroke w-1/3 h-1 rounded-full absolute bg-GREY-1 bottom-0.5 left-1/2 -translate-x-1/2"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "y-bottom-sheet",
};
</script>

<script setup>
import { computed, ref, onUnmounted, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

const target = ref(null);
const bottomSheetContent = ref(null);

const emit = defineEmits(["hide"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: String,
    default: "#ffffff",
  },
  ignoreClickOutside: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: [Array, String],
  },
});

const open = ref(props.show);

const setIgnore = () => {
  if (props.ignoreClickOutside) {
    return bottomSheetContent;
  }
};

onClickOutside(
  target,
  () => {
    open.value = false;
    emit("hide");
  },
  { ignore: [setIgnore()] }
);

const openBottomSheet = () => {
  open.value = !open.value;
};

const bottomSheetStatus = computed(() => {
  return props.show;
});

onMounted(() => {
  document.addEventListener("backbutton", openBottomSheet, false);
});

onUnmounted(() => {
  document.removeEventListener("backbutton", openBottomSheet);
});

const bgStyle = computed(() => {
  return `background-color: ${props.bg};`;
});
</script>
<style>
.slidedown-enter-active,
.slidedown-leave-active {
  transition: max-height 0.2s ease-in-out;
}

.slidedown-enter-to,
.slidedown-leave-from {
  overflow: hidden;
  max-height: 100%;
}

.slidedown-enter-from,
.slidedown-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
