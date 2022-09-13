<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <TreeNode
        :item="item"
        @selected="updateModelValue"
        :selected="selected"
        :simple="simple"
        :expanded="expanded"
      >
        <template #prefix>
          <slot name="prefix"></slot>
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
import { ref } from 'vue';

import TreeNode from './TreeNode/TreeNode.vue';

defineProps({
  items: {
    type: Array,
    required: true,
  },
  simple: {
    type: Boolean,
  },
  expanded: Boolean,
});

const emit = defineEmits(['onSelect', 'update:modelValue']);

const selected = ref({});

const updateModelValue = (e) => {
  selected.value = e;
  emit('update:modelValue', e.id);
  emit('onSelect', e.id);
};
</script>
