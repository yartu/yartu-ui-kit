<template>
  <div>
    <div
      v-if="dataSearch"
      class="h-20 border-b border-BORDER flex flex-wrap justify-between items-center"
    >
      <h1 class="heading-4 text-BLACK-2">
        <slot name="title"></slot>
      </h1>
      <label for="yartu-table-search" class="relative flex gap-2 h-fit">
        <div class="absolute left-4 bottom-0 top-0 my-auto h-fit">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.16675 1.6665C5.02461 1.6665 1.66675 5.02437 1.66675 9.1665C1.66675 13.3086 5.02461 16.6665 9.16675 16.6665C10.9376 16.6665 12.5651 16.0528 13.8482 15.0264L16.9108 18.0891C17.2363 18.4145 17.7639 18.4145 18.0893 18.0891C18.4148 17.7637 18.4148 17.236 18.0893 16.9106L15.0267 13.8479C16.053 12.5649 16.6667 10.9373 16.6667 9.1665C16.6667 5.02437 13.3089 1.6665 9.16675 1.6665ZM3.33341 9.1665C3.33341 5.94484 5.94509 3.33317 9.16675 3.33317C12.3884 3.33317 15.0001 5.94484 15.0001 9.1665C15.0001 12.3882 12.3884 14.9998 9.16675 14.9998C5.94509 14.9998 3.33341 12.3882 3.33341 9.1665Z"
              fill="#9AA1B4"
            />
          </svg>
        </div>
        <input
          @input="search($event.target.value)"
          placeholder="Search.."
          class="rounded-full outline-1 outline-BLUE focus:outline border border-BORDER pl-14 pr-4 py-2 text-sm"
          type="text"
        />
      </label>
    </div>
    <div v-if="loading">Loading..</div>
    <SimpleTable v-else>
      <template #thead>
        <tr class="text-BLACK-2">
          <th
            v-if="selectable"
            class="p-2.5 text-xs whitespace-nowrap font-semibold"
          >
            <Checkbox
              @click="selectAll"
              :checked="allChecked"
              :indeterminate="indeterminate"
            ></Checkbox>
          </th>
          <th
            v-for="header in headers"
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
          class="border-y border-BORDER text-BLACK-2 hover:bg-LIGHTBLUE-4 cursor-pointer"
          :class="{
            'bg-LIGHTBLUE-4': isActive(item),
            'opacity-20': item?.passive,
          }"
          v-for="(item, index) in tableItems"
          :key="index"
        >
          <td
            v-if="selectable"
            class="p-2.5 text-xs w-6 whitespace-nowrap font-semibold"
          >
            <y-checkbox
              @click.native.stop=""
              v-model="selectedList"
              :input-value="item[inputValue]"
            ></y-checkbox>
          </td>
          <td
            v-for="header in headers"
            :key="header.value"
            class="p-2.5 text-xs whitespace-nowrap font-semibold max-w-[10rem] truncate"
            :class="{ 'text-right': header === 'actions' }"
          >
            <slot
              :name="`y-table-${header.value}`"
              :item="item"
              :isActive="isActive"
            >
              {{ item[header.value] || '-' }}
            </slot>
          </td>
        </tr>
      </template>
    </SimpleTable>
  </div>
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
  loading: {
    type: Boolean,
    default: false,
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
  passive: {
    type: Boolean,
    default: true,
  },
  dataSearch: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Function,
    required: false,
  },
  filterFields: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(['selected', 'choose']);

const selectedList = ref([]);
const allChecked = ref(false);
const filteredItems = ref([]);

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

const tableItems = computed(() => {
  if (filteredItems.length > 0) {
    return filteredItems;
  }
  return props.items;
});

const search = (query) => {
  if (props.filter) {
    props.filter(query);
  }
};
</script>
