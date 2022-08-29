<template>
  <div class="relative" ref="target">
    <div>
      <p :class="labelClass">{{ label }}</p>
      <button
        ref="comboboxBtn"
        @click="openCombobox"
        :disabled="disabled"
        :class="comboboxClass"
      >
        <div
          class="flex-1 flex flex-wrap items-center gap-2"
          :class="chip ? 'gap-2' : ''"
        >
          <div
            v-for="(item, index) in !open ? closedItems : selected"
            :key="index"
            tabindex="0"
            @keydown.delete="deleteItem"
            @keypress="focusInput"
            class="combobox-selected-items focus:opacity-40 focus:outline-none"
          >
            <slot name="selection" :item="item">
              <p class="w-full">
                <Tag v-if="chip" tertiary outline class="text-xs">
                  {{ item }}
                </Tag>
                <span v-else>{{ item }}</span>
              </p>
            </slot>
          </div>
          <input
            ref="comboboxInput"
            type="text"
            class="h-full py-2 bg-transparent focus:outline-none text-BLACK-2 caret-inherit"
            :class="selected.length < 1 ? 'pl-2' : 'pr-2'"
            :placeholder="placeholder"
            @input="filter($event.target.value)"
            @keydown.delete="deleteItem"
            @keyup="enterSuggest"
          />
        </div>
        <span
          @click.stop="open = !open"
          tabindex="0"
          :class="open ? 'rotate-180' : ''"
          class="sticky top-0 transition-transform duration-300 self-start"
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
    </div>
    <teleport to="body">
      <div ref="optionContainer" :class="optionContainerClass">
        <template v-if="searching">
          <!-- TODO: @aziz fix me! -->
          <div class="p-2">
            <h1 class="body-1">
              LOADING..
            </h1>
          </div>
        </template>
        <template v-else>
          <div v-if="filteredItems.length === 0 && props.suggest" class="border-RED bg-YELLOW">
            Add: "{{ searchText }}"
          </div>
          <button
            @click="choose(item)"
            v-for="(item, index) in filteredItems"
            :key="index"
            type="button"
            tabindex="0"
            :class="[
              optionClass,
              isSelected(item) ? 'bg-LIGHTBLUE-4' : 'hover:bg-LIGHTBLUE-6',
            ]"
          >
            <slot name="select-item" :item="item" :selected="selected">
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
              <p>{{ item }}</p>
            </slot>
          </button>
        </template>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'y-combobox',
};
</script>

<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { validate } from '../FormItem/validations';

import Tag from '../Tag/Tag.vue';

const open = ref(false);
const selected = ref(props.modelValue);
const target = ref(null);
const closedItems = ref(null);
const comboboxInput = ref(null);
const comboboxBtn = ref(null);
const optionContainer = ref(null);
const filteredItems = ref(props.items);
const searchText= ref('');
const searching = ref(false);

const emit = defineEmits(['update:modelValue', 'search']);
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
    type: Array,
    required: true,
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
  filter: {
    type: Function,
    default: null,
  },
  suggest: {
    type: Boolean,
    required: false,
  },
  rules: {
    type: Array,
    required: false,
  },
  cleanUnvalidSuggest: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

onClickOutside(target, () => (open.value = false));

watchEffect(() => {
  closedItems.value = selected.value.filter((i, index) => index < 2);
  if (selected.value.length > 2)
    closedItems.value.push('+ ' + (selected.value.length - 2));
});

function openCombobox() {
  open.value = true;
  focusInput();
  setTimeout(() => {
    comboboxBtn.value.scroll({
      top: comboboxBtn.value.scrollHeight,
      behavior: 'smooth',
    });
  }, 200);
  calculatePosition();
}

function choose(item) {
  if (props.multiple) {
    let index = -1;
    if (props.itemKey) {
      index = selected.value.findIndex((s) => s[props.itemKey] === item[props.itemKey]);
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
  comboboxInput.value.value = '';
  filter('');
  focusInput();
  emit('update:modelValue', selected);
}

function isSelected(item) {
  if (props.multiple) {
    let index = -1;
    if (props.itemKey) {
      index = selected.value.findIndex((s) => s[props.itemKey] === item[props.itemKey]);
    } else {
      index = selected.value.findIndex((s) => s === item);
    }
    return index > -1;
  } else if (props.itemKey){
    return selected.value[props.itemKey] === item[props.itemKey];
  } else {
    return selected.value === item;
  }
}

// TODO:: improve delete item function
function deleteItem(key) {
  let items = document.getElementsByClassName('combobox-selected-items');
  if (document.activeElement === items[items.length - 1]) {
    selected.value.pop();
    setTimeout(() => {
      focusInput();
    }, 100);
  }
  if (
    key.keyCode === 8 &&
    items.length > 0 &&
    comboboxInput.value.value.length === 0
  ) {
    items[items.length - 1].focus();
  }
}

function enterSuggest(lorem) {
  const acceptCodes = [188, 13];
  if (props.suggest && lorem.isTrusted && acceptCodes.includes(lorem.keyCode)) {
    const value = lorem.target.value;
    if (props.rules) {
      const valid = validate(props.rules, value);
      if (props.cleanUnvalidSuggest && valid !== true) {
        comboboxInput.value.value = '';
      } else {
        const item = { isSuggest: true };
        item[props.itemText || 'value'] = value;
        item.valid = valid;
        choose(item);
      }
    } else {
      choose(value);
    }
  }
}

function focusInput() {
  comboboxInput.value.focus();
}

async function filter (value) {
  searching.value = true;
  searchText.value = value;
  if (!props.filter) {
    open.value = true;
    value = value.toLowerCase();
    filteredItems.value = props.items.filter((data) => {
      let lorem = data;
      if (typeof lorem === 'object') {
        lorem = lorem[props.itemKey];
      }
      // TODO :: add timeout @akucuk
      searching.value = false;
      return lorem.toLowerCase().match(value);
    });
  } else {
    filteredItems.value = await props.filter(props.items, value);
    searching.value = false;
  }
  emit('search', value);
}

function selectedItems(item) {
  let isSelected = false;
  if (
    props.multiple &&
    selected.value.includes(item) &&
    selected.value[selected.value.indexOf(item)] === item
  ) {
    isSelected = true;
  } else if (!props.multiple && selected.value === item) {
    isSelected = true;
  }
  return isSelected;
}

function calculatePosition () {
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
};

const comboboxClass = computed(() => {
  return [
    'w-full max-h-55',
    'py-2 px-4',
    'overflow-y-auto relative',
    'border rounded-lg',
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
    'fixed z-1000',
    'bg-white',
    'border-Border rounded-lg',
    'overflow-y-auto',
    'mt-2',
    'top-full',
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
    'py-3 p-2',
    'w-full',
  ];
});
</script>