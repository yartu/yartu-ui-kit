<template>
  <transition name="slidedown">
    <div
      ref="bottomSheetContent"
      v-show="bottomSheetStatus"
      class="w-full h-full fixed bottom-0 start-0 z-1001 flex flex-col bg-BLACKOVERLAY"
    >
      <div
        @click="closeBottomSheet"
        class="overlay flex-1 min-h-[40%] w-full"
      ></div>
      <div
        ref="items"
        class="items h-fit max-h-[60%] w-full rounded-t-lg py-2 overflow-hidden relative"
        :style="bgStyle"
      >
        <div class="w-full relative h-full overflow-y-scroll">
          <slot />
        </div>
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

const items = ref(null);
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

const closeBottomSheet = () => {
  open.value = false;
  emit("hide");
};

const setIgnore = () => {
  if (props.ignoreClickOutside) {
    return items;
  }
};

onClickOutside(
  items,
  () => {
    closeBottomSheet();
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
