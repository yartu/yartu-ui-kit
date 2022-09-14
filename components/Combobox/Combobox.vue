<template>
  <div class="relative" ref="target">
    <div class="bg-white">
      <p v-if="label != ''" :class="labelClass">{{ label }}</p>
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
            <slot
              name="selection"
              :item="item"
              :index="index"
              :close="removeItemByIndex"
            >
              <p class="w-full">
                <Tag v-if="chip" tertiary outline class="text-xs">
                  {{ item }}
                  <div v-if="closableChip">
                    <button @click="removeItemByIndex(index)">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.25 5.25L12.75 12.75"
                          stroke="#9AA1B4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.25 12.75L12.75 5.25"
                          stroke="#9AA1B4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Tag>
                <span v-else>{{ item }}</span>
              </p>
            </slot>
          </div>
          <input
            ref="comboboxInput"
            type="text"
            :class="[
              selected.length < 1 ? 'pl-2' : 'pr-2',
              inputContainerClass,
            ]"
            :placeholder="placeholder"
            @input="filter($event.target.value)"
            @keydown.delete="deleteItem"
            @keyup="enterSuggestRequest"
          />
        </div>
        <span
          @click.stop="open = !open"
          tabindex="0"
          :class="open ? 'rotate-180' : ''"
          class="sticky top-0 transition-transform duration-300"
        >
          <slot name="icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.5H2.79289L3.64645 7.35355L7.64645 11.3536L8 11.7071L8.35355 11.3536L12.3536 7.35355L13.2071 6.5H12L4 6.5Z"
                fill="#9AA1B4"
                stroke="#9AA1B4"
              />
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
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-BLUE"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </template>
        <template v-else>
          <slot
            name="no-data"
            v-if="
              filteredItems.length === 0 &&
              props.suggest &&
              searchText.length > 0
            "
            :search="searchText"
            :select="enterSuggestRequest"
          >
            <Tag
              tertiary
              outline
              class="text-xs mx-1"
              @click="enterSuggestRequest(searchText)"
            >
              {{ searchText }}
            </Tag>
          </slot>
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
import {
  ref,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  onUpdated,
  nextTick,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import { validate } from '../FormItem/validations';

import Tag from '../Tag/Tag.vue';

const open = ref(false);
const selected = ref(props.modelValue || []);
const target = ref(null);
const closedItems = ref(null);
const comboboxInput = ref(null);
const comboboxBtn = ref(null);
const filteredItems = ref(props.items);
const searchText = ref('');
const searching = ref(false);
const optionContainer = ref(null);

const emit = defineEmits(['update:modelValue', 'search']);
const props = defineProps({
  modelValue: {
    type: Array,
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
  cleanInvalidSuggest: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  closableChip: {
    type: Boolean,
    required: false,
  },
  closeAfterSelect: {
    type: Boolean,
    required: false,
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
  if (props.multiple) {
    closedItems.value = selected.value?.filter((i, index) => index < 2);
    if (selected.value?.length > 2) {
      closedItems.value.push('+ ' + (selected.value.length - 2));
    }
  }
});

const scrollToEnd = () => {
  comboboxBtn.value.scroll({
    top: comboboxBtn.value.scrollHeight,
    behavior: 'auto',
  });
};

onUpdated(async () => {
  await nextTick();
  calculatePosition();
  scrollToEnd();
});

function openCombobox() {
  open.value = true;
  focusInput();
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
    selected.value = [item];
  }
  comboboxInput.value.value = '';
  filter('');
  focusInput();

  if (props.closeAfterSelect) {
    open.value = false;
  } else {
    openCombobox();
  }

  emit('update:modelValue', selected);
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

function removeItemByIndex(index) {
  selected.value.splice(index, 1);
}

function enterSuggestRequest(suggest) {
  const acceptCodes = [188, 13];
  if (
    props.suggest &&
    suggest.isTrusted &&
    acceptCodes.includes(suggest.keyCode)
  ) {
    const value = suggest.target.value;
    if (value.length > 0) {
      if (props.rules) {
        const valid = validate(props.rules, value);
        if (props.cleanInvalidSuggest && valid !== true) {
          // comboboxInput.value.value = '';
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
  } else if (props.rules) {
    const value = suggest;
    if (value.length > 0) {
      const valid = validate(props.rules, suggest);
      if (props.cleanInvalidSuggest && valid !== true) {
        // comboboxInput.value.value = '';
      } else {
        const item = { isSuggest: true };
        item[props.itemText || 'value'] = value;
        item.valid = valid;
        choose(item);
      }
    }
  }
}

function focusInput() {
  comboboxInput.value.focus();
}

async function filter(value) {
  searchText.value = value;
  open.value = true;
  if (value && value.length > 0) {
    searching.value = true;
    if (!props.filter) {
      open.value = true;
      value = value.toLowerCase();
      filteredItems.value = props.items.filter((data) => {
        let filterItem = data;
        if (typeof filterItem === 'object') {
          filterItem = filterItem[props.itemKey];
        }
        // TODO :: add timeout @akucuk
        searching.value = false;
        return filterItem.toLowerCase().match(value);
      });
    } else {
      filteredItems.value = await props.filter(props.items, value);
      searching.value = false;
    }
    emit('search', value);
  }
}

const comboboxClass = computed(() => {
  return [
    'w-full max-h-55',
    'overflow-y-auto relative',
    'px-4',
    'border rounded-lg',
    'text-BLACK-2 font-semibold text-xs',
    'flex flex-wrap items-center gap-2',
    'disabled:border-GREY-2 disabled:bg-GREY-3',
    {
      'border-BLUE': open.value,
      'border-BORDER': !open.value,
      'py-1': props.dense,
      'py-2': !props.dense,
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

const openStatus = computed(() => {
  if (!open.value) {
    return false;
  }

  if (filteredItems.value.length > 0) {
    return true;
  }

  if (searchText.value.length === 0) {
    return false;
  }

  return true;
});

const inputContainerClass = computed(() => {
  return [
    'h-full bg-transparent focus:outline-none text-BLACK-2 caret-inherit',
    {
      'py-1': props.dense,
      'py-2': !props.dense,
    },
  ];
});

const optionContainerClass = computed(() => {
  return [
    'fixed z-1001',
    'bg-white',
    'border-Border rounded-lg',
    'overflow-y-auto',
    'top-full',
    'transition-all duration-300',
    'w-max',
    {
      'max-h-56 min-h-4 py-2 border': openStatus.value,
      'max-h-0 py-0 border-none': !open.value,
      'mt-0': props.dense,
      'mt-2': !props.dense,
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
