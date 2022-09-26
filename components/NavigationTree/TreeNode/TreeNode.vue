<template>
  <div @click.stop="selectNode(item)" :class="containerClass">
    <span
      v-if="isFolder && !expanded"
      @click.stop="toggle"
      class="w-5 h-5 rounded-full hover:bg-GREY-8 flex items-center justify-center relative z-1"
      :class="{ '-rotate-90': !isOpen }"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 7L8 11L12 7L4 7Z" fill="#9AA1B4" />
      </svg>
    </span>
    <span class="relative z-1 flex flex-wrap items-center justify-center">
      <slot name="prefix"></slot>
    </span>
    <h1 class="truncate relative z-1">{{ item.name }}</h1>
  </div>
  <div v-show="isOpen || expanded" v-if="isFolder" class="pl-3">
    <TreeNode
      v-for="node in childFolders"
      @selected="selectNode($event)"
      :item="node"
      :selected="selected"
      :expanded="expanded"
      :folderKey="folderKey"
    >
      <template #prefix>
        <slot name="prefix"></slot>
      </template>
    </TreeNode>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  item: Object,
  selected: Object,
  expanded: Boolean,
  folderKey: undefined,
});

const emit = defineEmits(['selected']);
const isOpen = ref(false);
const isSelected = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const selectNode = (e) => {
  emit('selected', e);
};

watch(
  () => props.selected,
  (newVal) => {
    if (props.folderKey) {
      isSelected.value =
        props.item[props.folderKey] === newVal[props.folderKey] ? true : false;
    } else {
      isSelected.value = props.item.id === newVal.id ? true : false;
    }
  },
);

const childFolders = computed(() => {
  return props.folderKey ? props.item[props.folderKey] : props.item.children;
});

const isFolder = computed(() => {
  let folder = false;
  if (props.folderKey) {
    folder = props.item[props.folderKey] && props.item[props.folderKey].length;
  } else {
    folder = props.item.children && props.item.children.length;
  }
  return folder;
});

const containerClass = computed(() => {
  return [
    'w-full',
    'py-2 px-6 mb-2',
    'subtitle-4',
    'flex gap-2 items-center',
    'cursor-pointer',
    {
      'before:absolute before:left-0 before:w-full before:h-[36px] before:bg-GREY-3 !text-BLUE':
        isSelected.value,
    },
  ];
});
</script>
