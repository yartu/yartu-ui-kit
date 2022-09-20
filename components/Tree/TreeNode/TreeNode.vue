<template>
  <div @click.stop="selectNode(item)" :class="containerClass">
    <span
      v-if="isFolder && !expanded"
      @click.stop="toggle"
      class="w-5 h-5 rounded-full hover:bg-GREY-8 flex items-center justify-center"
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
    <slot name="prefix"></slot>
    <h1 class="truncate">{{ item.name }}</h1>
  </div>
  <div v-show="isOpen || expanded" v-if="isFolder" class="ml-8">
    <TreeNode
      v-for="node in childFolders"
      @selected="selectNode($event)"
      :item="node"
      :selected="selected"
      :simple="simple"
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
  simple: Boolean,
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
    'p-2 mb-2',
    'subtitle-4',
    'border rounded-lg',
    'flex gap-2 items-center',
    'cursor-pointer',
    {
      'border-BLUE bg-LIGHTBLUE-4': isSelected.value,
      'border-BORDER bg-LIGHTBLUE-6': !isSelected.value && !props.simple,
      '!border-0 hover:bg-GREY-3': !isSelected.value && props.simple,
    },
  ];
});
</script>
