<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <TreeNode
        @selected="updateModelValue"
        @onDrop="emit('onDrop', $event)"
        @onTreeContext="emit('onTreeContext', $event)"
        :item="item"
        :selected="selected"
        :expanded="expanded"
        :folderKey="folderKey"
        :itemKey="itemKey"
      >
        <template #prefix="{ item }">
          <slot name="prefix" :item="item"></slot>
        </template>
        <template #suffix="{ item }">
          <slot name="suffix" :item="item"></slot>
        </template>
      </TreeNode>
    </div>
  </div>
</template>
<script>
export default {
  name: 'y-navigation-tree',
};
</script>

<script setup>
import TreeNode from './TreeNode/TreeNode.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemKey: undefined,
  folderKey: undefined,
  selected: Object,
  expanded: Boolean,
});

const emit = defineEmits([
  'onSelect',
  'update:modelValue',
  'onTreeContext',
  'onDrop',
]);

const updateModelValue = (e) => {
  const key = props.itemKey;
  if (key) {
    emit('update:modelValue', e[key]);
    emit('onSelect', { [key]: e[key], name: e.name });
  } else {
    emit('update:modelValue', e.id);
    emit('onSelect', e.id);
  }
  // selected.value = e;
};
</script>
