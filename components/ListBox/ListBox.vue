<template>
  <div class="bg-white border border-BORDER">
    <div
      tabindex="0"
      :key="index"
      type="button"
      v-for="(item, index) in props.options"
      class="block w-full"
    >
      <slot name="template" :item="item" :onClick="choose">
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

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  options: null,
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: null,
});

const selected = ref(props.modelValue);

function choose(item) {
  if (props.multiple && !selected.value.includes(item)) {
    selected.value.push(item);
  } else if (!props.multiple) {
    selected.value = item;
  } else if (props.multiple && selected.value.includes(item)) {
    selected.value = selected.value.filter((data) => data != item);
  }
  emit('update:modelValue', selected.value);
}
</script>

<style></style>
