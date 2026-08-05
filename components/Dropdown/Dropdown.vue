<template>
  <div ref="target" :class="containerClass">
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="!bottomSheetController && hasBeenOpened"
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
        v-if="bottomSheetController && hasBeenOpened"
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
import { computed, watch, ref, onUnmounted, onMounted, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { followAnchor } from '../../utils/anchorPosition';
import { BottomSheet } from '../BottomSheet';
// import { YartuTeleport } from "../YartuTeleport";

const open = ref(false);
const hasBeenOpened = ref(false);
const bottomSheetController = ref(false);
const target = ref(null);
const dropdownContent = ref(null);

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
    default: 'rgb(var(--y-white))',
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

const setIgnore = () => {
  if (props.ignoreClickOutside) {
    return dropdownContent;
  }
};

onClickOutside(
  target,
  () => {
    if (!open.value && !props.show) return;
    open.value = false;
    emit('hide');
  },
  { ignore: [setIgnore()] },
);

const revealContent = () => {
  if (hasBeenOpened.value) return;
  hasBeenOpened.value = true;
};

let pointerAnchor = null;
let stopFollowing = null;

const stopFollowingNow = () => {
  if (!stopFollowing) return;
  stopFollowing();
  stopFollowing = null;
};

const isOutOfSight = (rect) => rect.bottom <= 0
  || rect.right <= 0
  || rect.top >= window.innerHeight
  || rect.left >= window.innerWidth;

const rememberPointerAnchor = (pos) => {
  const el = pos && pos.target;
  if (!el || typeof el.getBoundingClientRect !== 'function') {
    pointerAnchor = null;
    return;
  }
  const rect = el.getBoundingClientRect();
  pointerAnchor = { el, dx: pos.x - rect.left, dy: pos.y - rect.top };
};

const reposition = () => {
  if (!pointerAnchor) {
    calculatePosition();
    return;
  }
  if (!pointerAnchor.el.isConnected) return;

  const rect = pointerAnchor.el.getBoundingClientRect();

  if (isOutOfSight(rect)) {
    stopFollowingNow();
    open.value = false;
    emit('hide');
    return;
  }

  calculatePosition({ x: rect.left + pointerAnchor.dx, y: rect.top + pointerAnchor.dy });
};

const openDropdown = () => {
  revealContent();
  pointerAnchor = null;
  open.value = !open.value;
  calculatePosition();
};

const openContextMenu = (pos = undefined) => {
  revealContent();
  open.value = false;
  if (pos !== undefined) {
    rememberPointerAnchor(pos);
    calculatePosition(pos);
  } else {
    pointerAnchor = null;
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
      revealContent();
      calculatePosition();
    }
  },
);

const dropdownOverflowController = ref(false);

const calculatePosition = (position = undefined) => {
  if (bottomSheetController.value) return;

  let anchor;
  if (position === undefined || position.type === 'resize') {
    if (!target.value) return;
    anchor = target.value.getBoundingClientRect();
  } else {
    anchor = { top: position.y, bottom: position.y, left: position.x, right: position.x };
  }

  nextTick(() => {
    const content = dropdownContent.value;
    if (!content) return;

    const { height, width } = content.getBoundingClientRect();
    const style = content.style;

    dropdownOverflowController.value = height > window.innerHeight;
    let top = 'auto';
    let bottom = 'auto';
    let left = 'auto';
    let right = 'auto';

    if (props.top) {
      top = (height + 16 > anchor.top && height > 0 ? height + 16 : anchor.top - 12) + 'px';
    } else if (anchor.top + height > window.innerHeight && height > 0) {
      bottom = '16px';
    } else {
      top = anchor.bottom + 12 + 'px';
    }

    if (props.left) {
      left = (width > anchor.left && width > 0 ? width + 16 : anchor.right) + 'px';
    } else if (width + anchor.right > window.innerWidth && width > 0) {
      right = '16px';
    } else {
      left = anchor.left + 'px';
    }

    style.top = top;
    style.bottom = bottom;
    style.left = left;
    style.right = right;
  });
};

const dropdownStatus = computed(() => {
  return props.show || open.value;
});

const followWhileOpen = (isOpen) => {
  if (isOpen && !stopFollowing) {
    stopFollowing = followAnchor(reposition);
  } else if (!isOpen) {
    stopFollowingNow();
  }
};

watch(dropdownStatus, followWhileOpen);

onMounted(() => {
  if (screen.width < 1024) bottomSheetController.value = true;
  if (props.show) {
    revealContent();
    followWhileOpen(true);
  }
});

onUnmounted(() => {
  followWhileOpen(false);
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
