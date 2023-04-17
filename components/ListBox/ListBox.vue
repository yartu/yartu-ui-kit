<template>
  <div class="bg-white border border-BORDER">
    <div
      tabindex="0"
      :key="index"
      type="button"
      v-for="(item, index) in props.options"
      class="block w-full"
    >
      <slot name="template" :item="item" :active="isActive(item)" :onClick="choose">
        <div
          class="text-BLACK-2 text-sm border-b border-BORDER p-4 hover:bg-GREY-3 last:border-0 cursor-pointer"
        >
          {{ item }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-listbox',
};
</script>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue', 'change']);
const props = defineProps({
  options: null,
  multiple: {
    type: Boolean,
    default: false,
  },
  itemKey: {
    type: String,
    required: false,
    default: 'id',
  },
  modelValue: null,
});

const selected = ref(props.modelValue);

const setItem = (item) => {
  if (typeof item === 'object') {
    return { ...item };
  }
  return item;
};

const choose = (item) => {

  let selectedItem = item;
  if (typeof item === 'object') {
    selectedItem = { ...item }[props.itemKey];
  }

  if (props.multiple && !selected.value.find((s) => s === selectedItem || s[props.selectedItem] === selectedItem)) {
    selected.value.push(setItem(item));
  } else if (!props.multiple) {
    selected.value = setItem(item);
  } else if (props.multiple && selected.value.find((s) => s === selectedItem || s[props.selectedItem] === selectedItem)) {
    selected.value = selected.value.filter((data) => {
      if (typeof data === 'object') {
        return data[props.itemKey] !== selectedItem;
      }
      return data !== selectedItem;
    });
  }
  emit('update:modelValue', selected.value);
  emit('change', selected.value)
}

const isActive = (item) => {
  if (!selected.value) {
    return false;
  }

  let selectedItem = item;
  if (typeof item === 'object') {
    selectedItem = item[props.itemKey];
  }
  if (props.multiple) {
    return selected.value.find((s) => s === selectedItem || s[props.itemKey] === selectedItem);
  } else {
    return selected.value === selectedItem || selected.value[props.itemKey] === selectedItem;
  }
};

</script>

<style></style>