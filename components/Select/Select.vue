<template>
  <div class="relative" ref="target">
    <label for="test">
      <p :class="labelClass">{{ label }}</p>
      <button
        id="test"
        @click="open = !open"
        :disabled="disabled"
        :class="selectClass"
      >
        <div
          class="flex-1 flex flex-wrap items-center"
          :class="chip ? 'gap-2' : ''"
        >
          <div v-for="(item, index) in selected" :key="index">
            <slot name="selection" :item="item">
              <p class="w-full">
                <Tag v-if="chip" tertiary outline>{{ item }}</Tag>
                <span v-else>{{ item }}</span>
                <template v-if="selected.length > 1 && !chip">,</template>
              </p>
            </slot>
          </div>
        </div>
        <span
          :class="open ? 'rotate-180' : ''"
          class="transition-transform duration-300"
        >
          <slot name="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10.5L12 16.5L18 10.5L6 10.5Z" fill="#9AA1B4" />
            </svg>
          </slot>
        </span>
      </button>
      <p
        v-if="(selected.length < 1 && !persistentHint) || persistentHint"
        class="text-xs mt-2 pl-0.5 absolute inset-x-0"
        :class="disabled ? 'text-GREY-1' : 'text-BLACK-2 '"
      >
        {{ hint }}
      </p>
    </label>
    <div :class="optionContainerClass">
      <button
        @click="choose(item)"
        v-for="(item, index) in items"
        :key="index"
        type="button"
        :class="[optionClass, selected.includes(item) ? 'bg-LIGHTBLUE-4' : '']"
      >
        <slot name="select-item" :item="item" :selected="selected">
          <span v-if="!selected.includes(item)" class="w-6 h-6"></span>
          <span v-if="selected.includes(item)">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11.4844L11.1667 16L18 8"
                stroke="#3663F2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <p>{{ item }}</p>
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-select',
};
</script>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Tag from '../Tag/Tag.vue';

const open = ref(false);
const selected = ref(new Array());
const target = ref(null);

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: [Object, Array],
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  chip: {
    type: Boolean,
    default: false,
  },
  items: {
    type: [Object, Array],
  },
  placeholder: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  persistentHint: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

onClickOutside(target, () => (open.value = false));

watchEffect(() => {
  const { modelValue } = props;
  selected.value = modelValue;
});

function choose(item) {
  if (props.multiple && !selected.value.includes(item)) {
    selected.value.push(item);
  } else if (!props.multiple) {
    selected.value.pop();
    selected.value.push(item);
    open.value = false;
  } else if (props.multiple && selected.value.includes(item)) {
    selected.value = selected.value.filter((data) => data != item);
  }
  emit('update:modelValue', selected);
}

const selectClass = computed(() => {
  return [
    'w-full',
    'border rounded-lg',
    'py-2 px-4',
    'text-BLACK-2 font-semibold text-xs',
    'flex flex-wrap items-center gap-2',
    'disabled:border-GREY-2 disabled:bg-GREY-3',
    {
      'border-BLUE': open.value,
      'border-BORDER': !open.value,
    },
  ];
});

const labelClass = computed(() => {
  return [
    'font-semibold text-sm',
    'mb-2 pl-0.5',
    {
      'text-GREY-1': props.disabled,
      'text-BLACK-2': !props.disabled,
    },
  ];
});

const optionContainerClass = computed(() => {
  return [
    'absolute z-14',
    'bg-white',
    'border-Border rounded-lg',
    'overflow-y-auto',
    'mt-2',
    'top-full',
    'transition-all duration-300',
    'w-full',
    {
      'max-h-52 py-2 border': open.value,
      'max-h-0 py-0 border-none': !open.value,
    },
  ];
});

const optionClass = computed(() => {
  return [
    'flex flex-wrap items-center gap-2',
    'font-semibold text-BLACK-2 text-sm',
    'text-left rtl:text-right',
    'py-3 p-2',
    'w-full',
    'hover:bg-LIGHTBLUE-6',
  ];
});
</script>
