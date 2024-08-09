<template>
  <div
    :id="selected?.id && selected.id === item.id ? 'selectedTreeNode' : ''"
    @click.stop="selectNode(item)"
    :class="containerClass"
  >
    <span
      v-if="isFolder && !expanded"
      @click.stop="toggle"
      class="w-5 h-5 rounded-full hover:bg-GREY-8 flex items-center justify-center"
      :class="{ '-rotate-90': !isOpen }"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7L8 11L12 7L4 7Z" fill="#9AA1B4" />
      </svg>
    </span>
    <slot name="prefix"></slot>
    <slot name="value" :item="item">
      <h1 v-if="label && item[label]" class="truncate" :title="item[label]">
        {{ item[label] }}
      </h1>
      <h1 v-else class="truncate" :title="item.name">
        {{ item.name }}
      </h1>
    </slot>
  </div>
  <div v-show="isOpen || expanded" v-if="isFolder" class="ms-4">
    <TreeNode
      v-for="node in childFolders"
      @selected="selectNode($event)"
      :item="node"
      :itemKey="itemKey"
      :selected="selected"
      :simple="simple"
      :expanded="expanded"
      :label="label"
      :folderKey="folderKey"
      :depth="depth + 1"
    >
      <template #prefix>
        <slot name="prefix"></slot>
      </template>
      <template #value="{ item }">
        <h1 v-if="label && item[label]" class="truncate" :title="item[label]">
          {{ item[label] }}
        </h1>
        <h1 v-else class="truncate" :title="item.name">
          {{ item.name }}
        </h1>
      </template>
    </TreeNode>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  item: Object,
  itemKey: String,
  selected: Object,
  simple: Boolean,
  expanded: Boolean,
  folderKey: undefined,
  label: undefined,
  depth: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['selected']);

const isOpenCheck = (item) => {
  if (props.selected) {
    if (props.selected[props.itemKey] === props.item[props.itemKey]) {
      return true;
    } else if (item[props.folderKey] && item[props.folderKey].length > 0) {
      for (const child of item[props.folderKey]) {
        if (child[props.itemKey] === props.selected[props.itemKey]) {
          return true;
        } else if (child[props.folderKey] && child[props.folderKey].length > 0) {
          return isOpenCheck(child);
        }
      }
    }
  }
  return false;
};

const isOpen = ref(isOpenCheck(props.item) || false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const selectNode = (e) => {
  emit('selected', e);
};

const isSelected = computed(() => {
  if (props.itemKey) {
    return props.item[props.itemKey] === props.selected[props.itemKey];
  }
  return false;
});

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
