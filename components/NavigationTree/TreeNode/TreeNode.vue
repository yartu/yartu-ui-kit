<template>
  <div
    @click.stop="selectNode(item)"
    :class="containerClass"
    @drop.stop="emit('onDrop', { item, $event })"
    @dragover.stop="onDragOver"
    @dragleave.stop="onDragLeave"
    @contextmenu.prevent.stop="emit('onTreeContext', { $event, item })"
  >
    <span
      v-if="isFolder && !expanded"
      @click.stop="toggle"
      class="w-5 h-5 rounded-full hover:bg-GREY-8 flex items-center justify-center relative z-2"
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
    <span
      :class="!isFolder ? 'pl-6' : ''"
      class="relative z-2 flex flex-wrap items-center justify-center"
    >
      <slot name="prefix"></slot>
    </span>
    <h1 class="truncate relative z-2" :title="item.name">
      {{ item.name }}
    </h1>
  </div>
  <div v-show="isOpen || expanded" v-if="isFolder" class="ml-6">
    <TreeNode
      v-for="node in childFolders"
      @selected="selectNode($event)"
      @onDrop="emit('onDrop', $event)"
      @onTreeContext="emit('onTreeContext', $event)"
      :item="node"
      :itemKey="itemKey"
      :selected="selected"
      :expanded="expanded"
      :folderKey="folderKey"
      :depth="depth + 1"
    >
      <template #prefix>
        <slot name="prefix"></slot>
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
  expanded: Boolean,
  folderKey: undefined,
  depth: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['selected', 'onTreeContext', 'onDrop']);

const isOpenCheck = (item) => {
  if (props.selected) {
    if (props.selected[props.itemKey] === props.item[props.itemKey]) {
      return true;
    } else if (item[props.folderKey] && item[props.folderKey].length > 0) {
      for (const child of item[props.folderKey]) {
        if (child[props.itemKey] === props.selected[props.itemKey]) {
          return true;
        } else if (
          child[props.folderKey] &&
          child[props.folderKey].length > 0
        ) {
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

const onDragOver = (ev) => {
  ev.currentTarget.style.backgroundColor = '#ebeff5ff';
  ev.preventDefault();
};

const onDragLeave = (ev) => {
  ev.currentTarget.style.backgroundColor = 'inherit';
  ev.preventDefault();
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
    'w-full',
    'py-2 pl-2 mb-2',
    'subtitle-5',
    'flex gap-1 items-center',
    'cursor-pointer',
    {
      'before:absolute before:z-2 before:left-0 before:w-[3px] before:h-[36px] before:bg-BLUE before:rounded-r-md after:absolute after:z-1 after:left-0 after:w-full after:h-[36px] after:bg-GREY-3 !text-BLUE':
        isSelected.value,
    },
  ];
});
</script>
