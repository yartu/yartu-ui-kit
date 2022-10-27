<template>
  <div class="relative" ref="target">
    <label :for="id">
      <p v-if="label" :class="labelClass">{{ label }}</p>
      <button
        :id="id"
        type="button"
        @click="openOptions"
        :disabled="disabled"
        :class="selectClass"
      >
        <div
          class="flex-1 flex flex-wrap items-center"
          :class="chip ? 'gap-2' : ''"
        >
          <p
            v-if="placeholder && selected.length === 0"
            class="text-sm font-normal text-GREY-1"
          >
            {{ placeholder }}
          </p>
          <template v-if="props.multiple">
            <div v-for="(item, index) in selected" :key="index">
              <slot name="selection" :item="item">
                <p class="w-full">
                  <Tag v-if="chip" tertiary outline>{{ item }}</Tag>
                  <span v-else-if="selected.length > 0">{{ item }}</span>
                  <template v-if="selected.length > 1 && !chip">,</template>
                </p>
              </slot>
            </div>
          </template>
          <template v-else>
            <slot name="selection" :item="selected">
              <p class="w-full text-left">
                <Tag v-if="chip" tertiary outline>{{ Array.isArray(selected) ? selected[0] : selected }}</Tag>
                <span v-else-if="selected">{{ Array.isArray(selected) ? selected[0] : selected }}</span>
              </p>
            </slot>
          </template>
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
        v-if="(selected.length === 0 && !persistentHint) || persistentHint"
        class="text-xs mt-2 pl-0.5 absolute inset-x-0"
        :class="disabled ? 'text-GREY-1' : 'text-BLACK-2 '"
      >
        {{ hint }}
      </p>
    </label>
    <teleport to="body">
      <div ref="optionContainer" :class="optionContainerClass">
        <button
          @click="choose(item)"
          v-for="(item, index) in items"
          :key="index"
          type="button"
          :class="[optionClass, isSelected(item) ? 'bg-LIGHTBLUE-4' : '']"
        >
          <slot
            name="select-item"
            :item="item"
            :selected="selected"
            :isSelected="isSelected"
          >
            <span v-if="isSelected(item)">
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
            <span v-else class="w-6 h-6"></span>
            <p v-if="itemText">
              {{ item[itemText] }}
            </p>
            <p v-else>
              {{ item }}
            </p>
          </slot>
        </button>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'y-select',
};
</script>

<script setup>
import { ref, computed, watchEffect, onUnmounted, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Tag from '../Tag/Tag.vue';

const open = ref(false);
const selected = ref([]);
const target = ref(null);
const optionContainer = ref(null);

const emit = defineEmits(['update:modelValue', 'selected']);

const props = defineProps({
  modelValue: {
    type: [Object, Array, String, Number],
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
  id: null,
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
  itemText: {
    type: String,
    required: false,
  },
  itemKey: {
    type: String,
    required: false,
  },
});

onClickOutside(target, () => (open.value = false));

watchEffect(() => {
  const { modelValue } = props;
  if (modelValue) {
    selected.value = modelValue;
  } else {
    selected.value = [];
  }
});

function openOptions() {
  open.value = !open.value;
  calculatePosition();
}

const calculatePosition = () => {
  // improve this @aziz
  let dropdownContainer = target.value.getBoundingClientRect();
  if (props.top) {
    optionContainer.value.style.top = dropdownContainer.top - 12 + 'px';
  } else {
    optionContainer.value.style.top = dropdownContainer.bottom + 12 + 'px';
  }
  if (props.left)
    optionContainer.value.style.left = dropdownContainer.right + 'px';
  else {
    optionContainer.value.style.left = dropdownContainer.left + 'px';
  }
  optionContainer.value.style.minWidth =
    dropdownContainer.right - dropdownContainer.left + 'px';
};

function choose(item) {
  console.log('CHOOSE', item);
  if (props.multiple) {
    let index = -1;
    if (props.itemKey) {
      index = selected.value.findIndex(
        (s) => s[props.itemKey] === item[props.itemKey],
      );
    } else {
      index = selected.value.findIndex((s) => s === item);
    }
    if (index === -1) {
      selected.value.push(item);
    } else {
      selected.value.splice(index, 1);
    }
  } else {
    selected.value = item;
    console.log('SELECTED', selected.value);
  }
  emit('update:modelValue', selected.value);
  emit('selected', selected.value);
}

function isSelected(item) {
  if (props.multiple) {
    let index = -1;
    if (props.itemKey) {
      index = selected.value.findIndex(
        (s) => s[props.itemKey] === item[props.itemKey],
      );
    } else {
      index = selected.value.findIndex((s) => s === item);
    }
    return index > -1;
  } else if (props.itemKey) {
    return selected.value[props.itemKey] === item[props.itemKey];
  } else {
    return selected.value === item;
  }
}

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

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
    'fixed z-1001',
    'bg-white',
    'border-BORDER rounded-lg',
    'overflow-y-auto',
    'transition-all duration-300',
    {
      'max-h-56 py-2 border': open.value,
      'max-h-0 py-0 border-none': !open.value,
    },
  ];
});

const optionClass = computed(() => {
  return [
    'flex flex-wrap items-center gap-2',
    'font-semibold text-BLACK-2 text-sm',
    'text-left rtl:text-right',
    'py-3 pl-2 pr-6',
    'w-full',
    'hover:bg-LIGHTBLUE-6',
  ];
});
</script>
