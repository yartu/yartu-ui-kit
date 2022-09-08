<template>
  <div>
    <div v-for="(item, index) of items" :key="index">
      <TreeNode
        :item="item"
        @selected="updateModelValue"
        :selected="selected"
        :simple="simple"
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
});

const emit = defineEmits(['update:modelValue']);

const selected = ref({});

const updateModelValue = (e) => {
  selected.value = e;
  emit('update:modelValue', e.id);
};
</script>
