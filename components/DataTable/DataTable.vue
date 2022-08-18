<template>
  <div class="flex flex-col w-full">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full overflow-hidden align-middle">
        <table :aria-describedby="ariaDesc" :class="tableClass">
          <thead class="text-GREY-1 text-sm font-semibold">
            <tr class="text-BLACK-2">
              <th v-if="selectable" class="p-2.5 text-xs whitespace-nowrap font-semibold">
                <Checkbox @click="selectAll" :checked="allChecked" :indeterminate="indeterminate"></Checkbox>
              </th>
              <th
                v-for="header in headers"
                :key="header.value"
                class="p-2.5 text-GREY-1 text-xs whitespace-nowrap font-semibold"
              >
                <slot :name="`thead-${header.value}`" :item="header">
                  {{ header.text }}
                </slot>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-y border-BORDER text-BLACK-2 relative"
              :class="{
                selected: 'bg-LIGHTBLUE-4 before:content before:h-full before:w-0.5 before:bg-BLUE before:absolute before:inset-y-0 before:left-0',
              }"
              v-for="(body, index) in bodyData"
              :key="index"
            >
              <td v-if="props.selectable" class="p-2.5 text-xs whitespace-nowrap font-semibold">
                <Checkbox v-model="selectedList" :input-value="body.id"> </Checkbox>
              </td>
              <td
                v-for="header in headers"
                :key="header.value"
                class="p-2.5 text-xs whitespace-nowrap font-semibold"
                :class="{ 'text-right': header === 'actions' }"
              >
                <slot :name="`tbody-${header.value}`" :item="body">
                  {{ body[header.value] || '-' }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'y-data-table',
  };
</script>

<script setup>

import { ref, computed } from 'vue';
import Checkbox from '../Checkbox';

const props = defineProps({
  ariaDesc: {
    type: String,
    default: '',
  },
  selectable: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  headers: {
    type: Array,
    required: false,
    default: () => [],
  },
  bodyData: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const emit = defineEmits(['selected']);

const selectedList = ref([]);
const allChecked = ref(false);

const indeterminate = computed(() => {
  const selectedLength = selectedList.value.length;
  const totalLength = props.contacts.length;
  emit('selected', selectedList.value);
  return selectedLength > 0 && selectedLength !== totalLength;
});

const selectAll = () => {
  allChecked.value = !allChecked.value;
  if (allChecked.value) {
    selectedList.value = props.contacts.map((i) => i.id);
  } else {
    selectedList.value = [];
  }
  emit('selected', selectedList.value);
};

const tableClass = computed(() => {
  return [
    'border-collapse',
    'table',
    'min-w-full',
    'items-center',
    'text-sm',
    'text-left',
  ];
});

</script>
