<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <TreeNode
        @selected="updateModelValue"
        :item="item"
        :selected="selected"
        :simple="simple"
        :expanded="expanded"
        :folderKey="folderKey"
        :itemKey="itemKey"
        :label="label"
      >
        <template #prefix>
          <slot name="prefix"></slot>
        </template>
        <template #value>
          <slot name="value" :item="item"></slot>
        </template>
      </TreeNode>
    </div>
  </div>
</template>
<script>
export default {
  name: 'y-tree',
};
</script>

<script setup>
import TreeNode from './TreeNode/TreeNode.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  simple: {
    type: Boolean,
  },
  itemKey: undefined,
  folderKey: undefined,
  label: undefined,
  selected: Object,
  expanded: Boolean,
});

const emit = defineEmits(['onSelect', 'update:modelValue']);

const updateModelValue = (e) => {
  const key = props.itemKey;
  if (key) {
    emit('update:modelValue', e[key]);
    emit('onSelect', { [key]: e[key], name: e.name });
  } else {
    emit('update:modelValue', e.id);
    emit('onSelect', e.id);
  }
};
</script>
