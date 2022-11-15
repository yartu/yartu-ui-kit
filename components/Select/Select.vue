<template>
  <div class="relative" ref="target">
    <label
      :for="componentId"
    >
      <p v-if="label" :class="labelClass">{{ label }}</p>
      <button
        type="button"
        @click="openOptions"
        :id="componentId"
        :disabled="disabled"
        :class="[selectClass, { 'border-RED focus:border-RED': hasError }]"
      >
        <div
          class="flex-1 flex flex-wrap items-center"
          :class="[
            !multiple ? 'calc-width-for-select-items truncate' : '',
            chip ? 'gap-2' : '',
          ]"
        >
          <p
            v-if="placeholder && !selected"
            class="text-sm font-normal text-GREY-1"
          >
            {{ placeholder }}
          </p>
          <template v-if="loading || isLoading">
            Loading..
          </template>
          <template v-else-if="props.multiple">
            <div v-for="(item, index) in selected" :key="index">
              <slot name="selection" :item="item">
                <p class="w-full">
                  <Tag v-if="chip" tertiary outline>
                    {{ itemText ? item[itemText] : item }}
                  </Tag>
                  <span v-else-if="selected.length > 0">
                    {{ itemText ? item[itemText] : item }}
                  </span>
                  <template v-if="selected.length > 1 && !chip">,</template>
                </p>
              </slot>
            </div>
          </template>
          <template v-else>
            <slot name="selection" :item="selected">
              <div v-if="selected" class="text-left truncate">
                <Tag v-if="chip" tertiary outline>
                  {{ selected }}
                </Tag>
                <span v-else :class="!multiple ? 'truncate' : ''">

                  {{ itemText ? selected[itemText] : selected }} 
                  
                  <!-- <template v-if="itemText && itemText.length > 0">
                    {{ Array.isArray(selected) ? selected[0] : selected[itemText] }}
                  </template>
                  <template v-else>
                    {{ Array.isArray(selected) ? selected[0] : selected }}
                  </template> -->
                </span>
              </div>
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
        v-if="(selected.length === 0 && !hint) || hint"
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
          v-for="(item, index) in itemsList"
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
            <p v-else class="calc-width-for-select-items truncate">
              {{ item }}
            </p>
          </slot>
        </button>
      </div>
    </teleport>
    <div :class="helperClass" v-if="helper">
      <slot name="helper"> </slot>
      <div v-if="errors && errors.length > 0">
        {{ errors.join(',') }}
      </div>
    </div>
  </div>
</template>

<script>
import FormItem from '../FormItem';

export default {
  name: 'y-select',
  extends: FormItem,
  computed: {
    hasError() {
      return this.errors && this.errors.length > 0;
    }
  }
};
</script>
<script setup>

import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
} from 'vue';

import { onClickOutside } from '@vueuse/core';
import Tag from '../Tag/Tag.vue';

const emit = defineEmits(['update:modelValue', 'selected']);
const props = defineProps({
  modelValue: {
    type: [Object, Array, String, Number],
    required: true,
  },
  itemKey: {
    type: String,
    required: false,
  },
  itemText: {
    type: String,
    required: false,
  },
  items: {
    type: [Array, Object, Function],
    required: true,
  },
  returnObject: {
    type: Boolean,
    default: () => false,
  },
  top: {
    type: Boolean,
    default: () => false,
  },
  left: {
    type: Boolean,
    default: () => false,
  },
  multiple: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  dense: {
    type: Boolean,
    default: () => false,
  },
  chip: {
    type: Boolean,
    default: () => false,
  },
  closableChip: {
    type: Boolean,
    default: () => true,
  },
  clearAfterSelect: {
    type: Boolean,
    default: () => false,
  },
  helper: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  closeAfterSelect: {
    type: Boolean,
    required: false,
    default: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  filter: {
    type: Function,
    required: false,
  },
  hint: {
    type: String,
    default: '',
  },
});

const componentId = ref(Math.random().toString(36).replace(/[^a-z]+/g, ''));
const open = ref(false);
const isLoading = ref(false);
const target = ref(null);
const optionContainer = ref(null);
const itemsList = ref([]);

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

watchEffect(async () => {
  const { items } = props;
  if (items) {
    if (typeof items === 'function') {
      isLoading.value = true;
      const res =  await items();
      itemsList.value = res.folders;
      isLoading.value = false;
      selected.value = initModels();
    } else {
      itemsList.value = items;
    }
  } else {
    itemsList.value = [];
  }
});

const initModels = () => {

  if (isLoading.value) {
    return [];
  }

  if (props.returnObject) {

    if (props.multiple) {
      let modelData = props.modelValue || [];
      if (!Array.isArray(modelData)) {
        modelData = [modelData];
      }

      const firstItem = modelData[0];
      if (typeof firstItem !== 'object' && props.itemKey) {
        const res = itemsList.value.filter((f) => props.modelValue.includes(f[props.itemKey]));
        return res;
      }
      return modelData;
    } else {

      if (typeof props.modelValue !== 'object' && props.itemKey) {
        const res = itemsList.value.find((f) => f[props.itemKey] === props.modelValue);
        return res;
      }
      return props.modelValue;
    }

  } else if (props.itemKey) {
    let modelData = props.modelValue;
    if (typeof modelData !== 'object' && props.itemKey) {
      if (props.multiple) {
        const res = itemsList.value.filter((f) => props.modelValue.includes(f[props.itemKey]));
        return res;
      } else {
        const res = itemsList.value.find((f) => f[props.itemKey] === props.modelValue);
        return res;
      }
    } else {
      alert(1);
      return modelData[props.itemKey];
    }
  }
  return props.modelValue;
};

const selected = ref(initModels());

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      selected.value = initModels();
    }
  },
);

watch(
  () => itemsList,
  () => {
    selected.value = initModels();
  },
);

const emitModel = () => {
  let emitData = selected.value;
  if (!props.returnObject && props.itemKey) {
    if (props.multiple) {
      emitData = selected.value.map((e) => e[props.itemKey])
    } else {
      emitData = selected.value[props.itemKey];
    }
  }

  if (!props.clearAfterSelect) {
    emit('update:modelValue', emitData);
    emit('selected', emitData);
  } else {
    emit('selected', emitData);
  }
};


onClickOutside(target, () => (open.value = false));

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

  if (window.innerHeight - dropdownContainer.bottom < 224) {
    setTimeout(() => {
      optionContainer.value.classList.add('force-to-top');
    }, 50);
  }
};

const choose = (item) => {
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
  }

  emitModel();

  if (props.closeAfterSelect) {
    open.value = false;
  }
};

const isSelected = (item) => {
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
};

const helperClass = computed(() => {
  return [
    'text-xs',
    'mt-2',
    'flex gap-1 items-center',
    'text-RED',
  ];
});


const selectClass = computed(() => {
  return [
    'w-full',
    'border rounded-lg',
    'py-2 px-3',
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
    'font-semibold text-BLACK-2 text-xs',
    'text-left rtl:text-right',
    'py-3 pl-2 pr-6',
    'w-full',
    'hover:bg-LIGHTBLUE-6',
  ];
});

</script>
