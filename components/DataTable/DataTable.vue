<template>
  <SimpleTable>
    <template #thead>
      <tr class="text-BLACK-2">
        <th v-if="props.selectable" class="p-2.5 text-xs whitespace-nowrap font-semibold">
          <Checkbox @click="selectAll" :checked="allChecked" :indeterminate="indeterminate"></Checkbox>
        </th>
        <th
          v-for="header in props.headers"
          :key="header.value"
          class="p-2.5 text-GREY-1 text-xs whitespace-nowrap font-semibold"
        >
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr
        @click.stop="openDetail(item)"
        class="border-y border-BORDER text-BLACK-2 relative hover:bg-LIGHTBLUE-4 cursor-pointer"
        :class="{
          'bg-LIGHTBLUE-4 before:w-0.5 before:bg-BLUE before:absolute before:inset-y-0 before:left-0': isActive(item),
        }"
        v-for="(item, index) in props.items"
        :key="index"
      >
        <td v-if="props.selectable" class="p-2.5 text-xs w-6 whitespace-nowrap font-semibold">
          <y-checkbox @click.native.stop='' v-model="selectedList" :input-value="item[inputValue]"></y-checkbox>
        </td>
        <td
          v-for="header in props.headers"
          :key="header.value"
          class="p-2.5 text-xs whitespace-nowrap font-semibold max-w-[10rem] truncate"
          :class="{ 'text-right': header === 'actions' }"
        >
          <slot :name="`y-table-${header.value}`" :item="item" :isActive="isActive">
            {{ item[header.value] || '-' }}
          </slot>
        </td>
      </tr>
    </template>
  </SimpleTable>
</template>


<script>
  export default {
    name: 'y-data-table',
  };
</script>

<script setup>

import { ref, computed } from 'vue';
import { SimpleTable } from '../SimpleTable';
import { Checkbox } from '../Checkbox';

const props = defineProps({
  selectable: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    required: true,
  },
  headers: {
    type: Array,
    required: false,
    default: () => [],
  },
  inputValue: {
    type: String,
    default: 'id',
  },
});

const emit = defineEmits(['selected', 'choose']);

const selectedList = ref([]);
const allChecked = ref(false);

const indeterminate = computed(() => {
  const selectedLength = selectedList.value.length;
  const totalLength = props.items.length;
  emit('selected', selectedList.value);
  return selectedLength > 0 && selectedLength !== totalLength;
});

const isActive = (item) => {
  return selectedList.value.includes(item[props.inputValue]);
};

const openDetail = (item) => {
  emit('choose', item);
};

const selectAll = () => {
  allChecked.value = !allChecked.value;
  if (allChecked.value) {
    selectedList.value = props.items.map((i) => i[props.inputValue]);
  } else {
    selectedList.value = [];
  }
  emit('selected', selectedList.value);
};
</script>
