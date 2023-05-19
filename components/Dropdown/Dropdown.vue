<template>
  <div ref="target" :class="containerClass">
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="!bottomSheetController"
          ref="dropdownContent"
          v-show="dropdownStatus"
          :style="bgStyle"
          :class="[classes, contentClass, dropdownStatus ? 'flex' : 'hidden']"
        >
          <ol>
            <slot />
          </ol>
        </div>
      </transition>
      <bottom-sheet
        v-if="bottomSheetController"
        :show="dropdownStatus"
        :bg="bg"
        :ignoreClickOutside="ignoreClickOutside"
        :classes="classes"
      >
        <slot />
      </bottom-sheet>
    </teleport>

    <slot name="activator" :open="openDropdown" :context-menu="openContextMenu"> </slot>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown',
};
</script>

<script setup>
import { computed, watch, ref, onUnmounted, onMounted, shallowRef, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { BottomSheet } from '../BottomSheet';
// import { YartuTeleport } from "../YartuTeleport";

const open = ref(false);
const bottomSheetController = ref(false);
const target = ref(null);
const dropdownContent = ref(null);

const setIgnore = () => {
  if (props.ignoreClickOutside) {
    return dropdownContent;
  }
};

onClickOutside(
  target,
  () => {
    open.value = false;
    emit('hide');
  },
  { ignore: [setIgnore()] },
);

const emit = defineEmits(['hide']);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  flex: {
    type: Boolean,
    default: false,
  },
  bg: {
    type: String,
    default: '#ffffff',
  },
  left: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
  ignoreClickOutside: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: [Array, String],
  },
});

const openDropdown = () => {
  open.value = !open.value;
  calculatePosition();
};

const openContextMenu = (pos = undefined) => {
  open.value = false;
  if (pos !== undefined) {
    calculatePosition(pos);
  } else {
    calculatePosition();
  }
  open.value = true;
};

defineExpose({
  openContextMenu,
});

watch(
  () => props.show,
  (val) => {
    if (val) {
      calculatePosition();
    }
  },
);

const dropdownOverflowController = ref(false);

const calculatePosition = (dropdownContainer = undefined) => {
  // improve this @kenarumut
  if (!bottomSheetController.value) {
    if (dropdownContainer === undefined || dropdownContainer.type === 'resize') {
      dropdownContainer = target.value.getBoundingClientRect();
    } else {
      dropdownContainer.top = dropdownContainer.y;
      dropdownContainer.bottom = dropdownContainer.y;
      dropdownContainer.left = dropdownContainer.x;
      dropdownContainer.right = dropdownContainer.x;
    }

    let heightContoller = 0;
    let widthController = 0;
    nextTick(() => {
      heightContoller = dropdownContent.value.getBoundingClientRect().height;
      widthController = dropdownContent.value.getBoundingClientRect().width;
      if(heightContoller > window.innerHeight) dropdownOverflowController.value = true;
      else dropdownOverflowController.value = false;
      if (props.top) {
        if ((heightContoller + 16) > dropdownContainer.top && heightContoller > 0) {
          dropdownContent.value.style.top = heightContoller + 16 + 'px';
        } else {
          dropdownContent.value.style.top = dropdownContainer.top - 12 + 'px';
        }
      } else {
        if (dropdownContainer.top + heightContoller > window.innerHeight && heightContoller > 0) {
          dropdownContent.value.style.top = 'auto';
          dropdownContent.value.style.bottom = '16px';
        } else {
          dropdownContent.value.style.top = dropdownContainer.bottom + 12 + 'px';
        }
      }
      if (props.left) {
        if (widthController > dropdownContainer.left && widthController > 0) {
          dropdownContent.value.style.left = widthController + 16 + 'px';
        } else {
          dropdownContent.value.style.left = dropdownContainer.right + 'px';
        }
      } else {
        if (widthController + dropdownContainer.right > window.innerWidth && widthController > 0) {
          dropdownContent.value.style.left = 'auto';
          dropdownContent.value.style.right = '16px';
        } else {
          dropdownContent.value.style.left = dropdownContainer.left + 'px';
        }
      }
    });
  }
};

const dropdownStatus = computed(() => {
  return props.show || open.value;
});

onMounted(() => {
  if (screen.width < 1024) bottomSheetController.value = true;
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const bgStyle = computed(() => {
  return `background-color: ${props.bg};`;
});

const containerClass = computed(() => {
  return [
    'relative',
    {
      block: props.block,
      'inline-block': !props.block && !props.flex,
    },
    {
      flex: props.flex,
    },
  ];
});

const contentClass = computed(() => {
  return [
    'dropdown-content',
    'shadow-1',
    'fixed z-1001',
    {
      'max-h-fit' : !dropdownOverflowController.value,
      'h-full overflow-scroll' : dropdownOverflowController.value,
    }, 
    'py-2',
    'bg-WHITE',
    'text-sm font-semibold text-BLACK-2',
    'flex flex-col max-w-[232px] w-[232px]',
    'border-BORDER border rounded-lg',
    {
      '-translate-x-full': props.left,
      '-translate-y-full': props.top,
    },
  ];
});
</script>
