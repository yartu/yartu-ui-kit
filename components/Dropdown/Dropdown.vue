<template>
  <div ref="target" :class="containerClass">
    <teleport to="body">
      <transition name="fade">
        <div
          ref="dropdownContent"
          v-show="dropdownStatus"
          :style="bgStyle"
          :class="[contentClass, dropdownStatus ? 'flex' : 'hidden']"
        >
          <ol>
            <slot />
          </ol>
        </div>
      </transition>
    </teleport>
    <slot name="activator" :open="openDropdown" :context-menu="openContextMenu">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'y-dropdown',
};
</script>

<script setup>
import { computed, ref, onUnmounted, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

const open = ref(false);
const target = ref(null);
const dropdownContent = ref(null);

onClickOutside(target, () => (open.value = false));

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  block: {
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
});

function openDropdown() {
  open.value = !open.value;
  calculatePosition();
}

function openContextMenu(pos = undefined) {
  open.value = false;
  if (pos !== undefined) {
    calculatePosition(pos);
  } else {
    calculatePosition();
  }
  open.value = true;
}

defineExpose({
  openContextMenu,
});

const calculatePosition = (dropdownContainer = undefined) => {
  // improve this @aziz
  if (dropdownContainer === undefined) {
    dropdownContainer = target.value.getBoundingClientRect();
  } else {
    dropdownContainer.top = dropdownContainer.y;
    dropdownContainer.bottom = dropdownContainer.y;
    dropdownContainer.left = dropdownContainer.x;
    dropdownContainer.right = dropdownContainer.x;
  }
  if (props.top) {
    dropdownContent.value.style.top = dropdownContainer.top - 12 + 'px';
  } else {
    dropdownContent.value.style.top = dropdownContainer.bottom + 12 + 'px';
  }
  if (props.left)
    dropdownContent.value.style.left = dropdownContainer.right + 'px';
  else {
    dropdownContent.value.style.left = dropdownContainer.left + 'px';
  }
};

const dropdownStatus = computed(() => {
  return props.show || open.value;
});

onMounted(() => {
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
      'inline-block': !props.block,
    },
  ];
});

const contentClass = computed(() => {
  return [
    'dropdown-content',
    'shadow-1',
    'fixed z-1001',
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
