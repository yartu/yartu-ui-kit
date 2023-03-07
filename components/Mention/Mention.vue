<template>
  <div ref="mentionContainer">
    <Dropdown
      :show="show"
      top
    >
      <template #activator>
        <slot></slot>
      </template>
      <DropdownItem v-if="displayedItems.length === 0">
        Not Found
      </DropdownItem>
      <DropdownItem
        v-for="(item, index) in displayedItems"
        :key="index"
        :active="index === selectedIndex"
        @click.stop.prevent="applyMention(index)"
        @hover="selectedIndex = index"
      >
        <slot
          :name="`item-${currentKey || oldKey}`"
          :item="item"
          :index="index"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
          >
            {{ item.label || item.value }}
          </slot>
        </slot>

      </DropdownItem>
    </Dropdown> 
  </div>
</template>

<script>

// vue-mention
// https://github.com/Akryum/vue-mention/blob/next/packages/vue-mention/src/Mentionable.vue

// MIT License 
// https://github.com/Akryum/vue-mention/blob/next/LICENSE

export default {
  name: 'y-mention'
}
</script>
<script setup>

import {
  computed,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
  nextTick
} from 'vue';

import { Dropdown } from '../Dropdown';
import { DropdownItem } from '../DropdownItem';
import getCaretPosition from '../../utils/textareacaret';

const show = ref(false);
const currentKey = ref(null);
const cancelKeyUp = ref(null);
const oldKey = ref(null);
const mentionContainer = ref(null);
const caretPosition = ref(null);
const lastSearchText = ref(null);
const searchText = ref(null);
const currentKeyIndex = ref(0);
const selectedIndex = ref(0);
const input = ref(null);

const emit = defineEmits(['search', 'open', 'close', 'apply']);
const props = defineProps({
  keys: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  filteredKey: {
    type: String,
    required: false,
    default: () => 'label',
  },
  omitKey: {
    type: Boolean,
    default: false,
  },
  filteringDisabled: {
    type: Boolean,
    default: false,
  },
  insertSpace: {
    type: Boolean,
    default: false,
  },
  mapInsert: {
    type: Function,
    default: null,
  },
  limit: {
    type: Number,
    default: 8,
  },
  theme: {
    type: String,
    default: 'mentionable',
  },
  caretHeight: {
    type: Number,
    default: 0,
  },
});

watch(
  () => searchText,
  (value, oldValue) => {
    if (value) {
        emit('search', value, oldValue);
    }
  }
);

const filteredItems = computed(() => {
    if (!searchText.value || props.filteringDisabled) {
      return props.items;
    }
    return props.items.filter((item) => {
      const text = item[props.filteredKey];
      return text.toLowerCase().includes(searchText.value.toLowerCase());
    });
});

const displayedItems = computed(() => { return filteredItems.value.slice(0, props.limit); });

watch(
  () => displayedItems,
  () => {
    selectedIndex.value = 0;
  },
  {  deep: true },
);

const attach = () => {
  if (input.value) {
    input.value.addEventListener('input', onInput);
    input.value.addEventListener('keydown', onKeyDown);
    input.value.addEventListener('keyup', onKeyUp);
    input.value.addEventListener('scroll', onScroll);
    input.value.addEventListener('blur', onBlur);
  }
}

const detach = () => {
  if (input.value) {
    input.value.removeEventListener('input', onInput);
    input.value.removeEventListener('keydown', onKeyDown);
    input.value.removeEventListener('keyup', onKeyUp);
    input.value.removeEventListener('scroll', onScroll);
    input.value.removeEventListener('blur', onBlur);
  }
};

const getInput = () => {
  return mentionContainer.value.querySelector('input') ?? mentionContainer.value.querySelector('textarea') ?? mentionContainer.value.querySelector('[contenteditable="true"]')
}

onMounted(() => {
  input.value = getInput();
  attach();
});

onUpdated(() => {
  const newInput = getInput();
  if (newInput !== input.value) {
    detach();
    input.value = newInput;
    attach();
  }
});

onUnmounted(() => {
  detach();
});

const onInput = () => {
  checkKey();
}

const onBlur = () => {
  closeMenu();
}

const onKeyDown = (e) => {
  if (currentKey.value) {
    if (e.key === 'ArrowDown') {
      selectedIndex.value = Math.min(selectedIndex.value + 1, props.items.length - 1)
      cancelEvent(e);
    }
    if (e.key === 'ArrowUp') {
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      cancelEvent(e);
    }
    if ((e.key === 'Enter' || e.key === 'Tab') &&
      displayedItems.value.length > 0) {
      applyMention(selectedIndex.value);
      cancelEvent(e);
    }
    if (e.key === 'Escape') {
      closeMenu();
      cancelEvent(e);
    }
  }
};

const onKeyUp = (e) => {
  if (cancelKeyUp.value && e.key === cancelKeyUp.value) {
    cancelEvent(e);
  }
  cancelKeyUp.value = null;
}

const cancelEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
  cancelKeyUp.value = e.key;
}

const onScroll = () => {
  updateCaretPosition();
}

const getSelectionStart = () => {
  return input.value.isContentEditable ? window.getSelection().anchorOffset : input.value.selectionStart;
}

const setCaretPosition = (index) => {
  nextTick(() => {
    input.value.selectionEnd = index;
  });
}

const getValue = () => {
  return input.value.isContentEditable ? window.getSelection().anchorNode.textContent : input.value.value;
}

const setValue = (value) => {
  input.value.value = value;
  emitInputEvent('input');
}

const emitInputEvent = (type) => {
  input.value.dispatchEvent(new Event(type));
}

const checkKey = () => {
  const index = getSelectionStart();
  if (index >= 0) {
    const { key, keyIndex } = getLastKeyBeforeCaret(index);
    const text = getLastSearchText(index, keyIndex);
    lastSearchText.value = text;
    if (!(keyIndex < 1 || /\s/.test(getValue()[keyIndex - 1]))) {
      return false;
    }
    if (text != null) {
      openMenu(key, keyIndex);
      searchText.value = text;
      return true;
    }
  }
  closeMenu();
  return false;
};

const getLastKeyBeforeCaret = (caretIndex) => {
  const [keyData] = props.keys.map((key) => ({
    key,
    keyIndex: getValue().lastIndexOf(key, caretIndex - 1),
  })).sort((a, b) => b.keyIndex - a.keyIndex);

  return keyData;
};

const getLastSearchText = (caretIndex, keyIndex) => {
  if (keyIndex !== -1) {
    const text = getValue().substring(keyIndex + 1, caretIndex);
    if (!/\s/.test(text)) {
      return text;
    }
  }
  return null;
};

const updateCaretPosition = () => {
  if (currentKey.value) {
    if (input.value.isContentEditable) {
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      const inputRect = input.value.getBoundingClientRect();
      caretPosition.value = {
        left: rect.left - inputRect.left,
        top: rect.top - inputRect.top,
        height: rect.height,
      };
    }
    else {
      caretPosition.value = getCaretPosition(input.value, currentKeyIndex.value);
    }
    caretPosition.value.top -= input.value.scrollTop;
    if (props.caretHeight) {
      caretPosition.value.height = props.caretHeight;
    }
    else if (isNaN(caretPosition.value.height)) {
      caretPosition.value.height = 16;
    }
  }
};

const openMenu = (key, keyIndex) => {
  if (currentKey.value !== key) {
    currentKey.value = key;
    currentKeyIndex.value = keyIndex;
    updateCaretPosition();
    selectedIndex.value = 0;
    show.value = true;
    emit('open', currentKey.value);
  }
};

const closeMenu = () => {
  if (currentKey.value != null) {
    oldKey.value = currentKey.value;
    currentKey.value = null;
    show.value = false;
    emit('close', oldKey.value);
  }
};

const applyMention = (itemIndex) => {
  console.log('A P P L Y ::: ', itemIndex, displayedItems.value);
  const item = displayedItems.value[itemIndex];
  const value = (props.omitKey ? '' : currentKey.value) + String(props.mapInsert ? props.mapInsert(item, currentKey.value) : item.value) + (props.insertSpace ? ' ' : '');

  if (input.value.isContentEditable) {
      var range = window.getSelection().getRangeAt(0);
      range.setStart(range.startContainer, range.startOffset - currentKey.value.length - (lastSearchText.value ? lastSearchText.value.length : 0));
      range.deleteContents();
      range.insertNode(document.createTextNode(value));
      range.setStart(range.endContainer, range.endOffset);
      emitInputEvent('input');
  } else {
    setValue(replaceText(getValue(), searchText.value, value, currentKeyIndex.value));
    setCaretPosition(currentKeyIndex.value + value.length);
  }
  emit('apply', item, currentKey.value, value);
  closeMenu();
};

const replaceText = (text, searchString, newText, index) => {
  return text.slice(0, index) + newText + text.slice(index + searchString.length + 1, text.length);
};

</script>
