<!-- ref: https://github.com/vueform/multiselect/ -->
<!-- MIT Licence -->

<template>
  <div>
    <label>
      <p v-if="formLabel" :class="classList.labelClass">
        {{ formLabel }}
      </p>
    </label>
    <div
      ref="multiselect"
      :class="[classList.container, hasError ? '!border-RED' : '']"
      :id="searchable ? undefined : id"
      :dir="rtl ? 'rtl' : undefined"
      @keyup="handleKeyup"
      @keydown="handleKeydown"
      @focusin="handleFocusIn"
    >
      <div
        ref="wrapper"
        @mousedown="handleMousedown"
        :class="classList.wrapper"
        :tabindex="tabindex"
        :aria-controls="!searchable ? ariaControls : undefined"
        :aria-placeholder="!searchable ? ariaPlaceholder : undefined"
        :aria-expanded="!searchable ? isOpen : undefined"
        :aria-activedescendant="!searchable ? ariaActiveDescendant : undefined"
        :aria-multiselectable="!searchable ? ariaMultiselectable : undefined"
        :role="!searchable ? 'combobox' : undefined"
        v-bind="!searchable ? arias : {}"
      >
        <!-- Search -->
        <template v-if="mode !== 'tags' && searchable && !disabled">
          <input
            :type="inputType"
            :modelValue="search"
            :value="search"
            :class="classList.search"
            :autocomplete="autocomplete"
            :id="searchable ? id : undefined"
            @input="handleSearchInput"
            @keypress="handleKeypress"
            @paste.stop="handlePaste"
            ref="input"
            :aria-controls="ariaControls"
            :aria-placeholder="ariaPlaceholder"
            :aria-expanded="isOpen"
            :aria-activedescendant="ariaActiveDescendant"
            :aria-multiselectable="ariaMultiselectable"
            role="combobox"
            v-bind="{
              ...attrs,
              ...arias,
            }"
          />
        </template>

        <!-- Tags (with search) -->
        <template v-if="mode === 'tags'">
          <div
            :class="classList.tags"
            style="width: calc(100% - 4rem)"
            data-tags
          >
            <slot
              v-if="!hideSelected"
              v-for="(option, i, key) in activeListed.items"
              name="tag"
              :option="option"
              :handleTagRemove="handleTagRemove"
              :disabled="disabled"
            >
              <span
                :class="classList.tag"
                tabindex="-1"
                @keyup.enter="handleTagRemove(option, $event)"
                :key="key"
                :aria-label="ariaTagLabel(option[label])"
              >
                <p class="truncate">{{ option[label] }}</p>
                <y-button
                  size="2xs"
                  circle
                  v-if="!disabled"
                  :class="classList.tagRemove"
                  @click.stop="handleTagRemove(option, $event)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.66699 4.66602L11.3337 11.3327"
                      stroke="#9AA1B4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.66699 11.3327L11.3337 4.66602"
                      stroke="#9AA1B4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span :class="classList.tagRemoveIcon"></span>
                </y-button>
              </span>
            </slot>
            <slot
              v-if="
                !hideSelected && activeListed.more && activeListed.items.length >= 2 && !isOpen
              "
              name="tag-more"
              :count="activeListed.more"
            >
              <span
                :class="classList.tag"
                tabindex="-1"
                :key="key"
                :aria-label="activeListed.more"
                @click.stop="activate(true)"
              >
                <p class="truncate">+ {{ activeListed.more }}</p>
              </span>
            </slot>

            <div :class="classList.tagsSearchWrapper" ref="tags">
              <!-- Used for measuring search width -->
              <span :class="classList.tagsSearchCopy">{{ search }}</span>

              <!-- Actual search input -->
              <input
                v-if="searchable && !disabled"
                :type="inputType"
                :modelValue="search"
                :value="search"
                :class="classList.tagsSearch"
                :id="searchable ? id : undefined"
                :autocomplete="autocomplete"
                @input="handleSearchInput"
                @keypress="handleKeypress"
                @paste.stop="handlePaste"
                ref="input"
                :aria-controls="ariaControls"
                :aria-placeholder="ariaPlaceholder"
                :aria-expanded="isOpen"
                :aria-activedescendant="ariaActiveDescendant"
                :aria-multiselectable="ariaMultiselectable"
                role="combobox"
                v-bind="{
                  ...attrs,
                  ...arias,
                }"
              />
            </div>
          </div>
        </template>
        <!-- Single label -->

        <template v-if="mode == 'single' && hasSelected && !search && iv">
          <slot name="selected-item" :value="iv" :option="iv">
            <div :class="classList.singleLabel">
              <span :class="classList.singleLabelText">
                {{ iv[label] }}
              </span>
            </div>
          </slot>
        </template>

        <!-- Multiple label -->

        <template v-if="mode == 'multiple' && hasSelected && !search">
          <div :class="classList.as" v-html="multipleLabelText"></div>
          <div :class="classList.tags" v-if="false">
            <slot
              name="selected-item"
              v-for="(option, i) in activeListed.items"
              :key="i"
              :option="option"
              :handleTagRemove="handleTagRemove"
              :disabled="disabled"
            >
              <span
                :class="classList.simpleMultiple"
                tabindex="-1"
                @keyup.enter="handleTagRemove(option, $event)"
                :key="key"
                :aria-label="ariaTagLabel(option[label])"
              >
                <p class="truncate">{{ option[label] }}</p>
              </span>
              <template v-if="i + 1 < activeListed.items.length"> , </template>
            </slot>
            <slot
              name="more"
              v-if="
                mode === 'multiple' && activeListed && activeListed.more > 0
              "
              :more="activeListed.more"
            >
              + {{ activeListed.more }} more
            </slot>
          </div>
        </template>

        <!-- Placeholder -->
        <template v-if="placeholder && !search && (!hasSelected || hideSelected)">
          <slot name="placeholder">
            <div :class="classList.placeholder" aria-hidden="true">
              {{ placeholder }}
            </div>
          </slot>
        </template>

        <!-- Spinner -->
        <slot v-if="loading || resolving" name="spinner">
          <span :class="classList.spinner" aria-hidden="true">
            <svg
              class="animate-spin h-5 w-5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                :fill="spinnerBg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 5.25C8.24672 5.25 5.25 8.24672 5.25 12C5.25 15.7533 8.24672 18.75 12 18.75C15.7533 18.75 18.75 15.7533 18.75 12C18.75 8.24672 15.7533 5.25 12 5.25ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              />
              <path
                :fill="spinnerColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.75 12C18.75 8.27208 15.7279 5.25 12 5.25V3C16.9706 3 21 7.02944 21 12H18.75Z"
              />
            </svg>
          </span>
        </slot>
        <div class="ml-auto flex items-center justify-center">
          <!-- Clear -->
          <slot
            v-if="hasSelected && !disabled && canClear && !busy"
            name="clear"
            :clear="clear"
          >
            <span
              aria-hidden="true"
              tabindex="0"
              role="button"
              data-clear
              aria-roledescription="❎"
              :class="classList.clear"
              @click="clear"
              @keyup.enter="clear"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z"
                  fill="#9AA1B4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967Z"
                  fill="#9AA1B4"
                />
              </svg>
            </span>
          </slot>

          <!-- Caret -->
          <slot v-if="caret && showOptions" name="caret">
            <span
              :class="classList.caret"
              @click.stop="handleCaretClick"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10.5L12 16.5L18 10.5L6 10.5Z" fill="#9AA1B4" />
              </svg>
            </span>
          </slot>
        </div>
      </div>

      <!-- Options -->
      <teleport to="body">
        <div ref="optionContainer" :class="classList.dropdown" tabindex="-1">
          <slot name="beforelist" :options="fo"></slot>
          
          <slot v-if="loading" name="loading">
            Loading..
          </slot>

          <ul v-else :class="classList.options" :id="ariaControls" role="listbox">
            <template v-if="groups">
              <li
                v-for="(group, i, key) in fg"
                :class="classList.group"
                :key="key"
                :id="ariaGroupId(group)"
                :aria-label="ariaGroupLabel(group)"
                :aria-selected="isSelected(group)"
                role="option"
              >
                <div
                  :class="classList.groupLabel(group)"
                  :data-pointed="isPointed(group)"
                  @mouseenter="setPointer(group, i)"
                  @click="handleGroupClick(group)"
                >
                  <slot
                    name="grouplabel"
                    :group="group"
                    :is-selected="isSelected"
                    :is-pointed="isPointed"
                  >
                    <span v-html="group[groupLabel]"></span>
                  </slot>
                </div>

                <ul
                  :class="classList.groupOptions"
                  :aria-label="ariaGroupLabel(group)"
                  role="group"
                >
                  <li
                    v-for="(option, i, key) in group.__VISIBLE__"
                    :class="classList.option(option, group)"
                    :data-pointed="isPointed(option)"
                    :data-selected="isSelected(option) || undefined"
                    :key="key"
                    @mouseenter="setPointer(option)"
                    @click="handleOptionClick(option)"
                    :id="ariaOptionId(option)"
                    :aria-selected="isSelected(option)"
                    :aria-label="ariaOptionLabel(option)"
                    role="option"
                  >
                    <slot
                      name="option"
                      :option="option"
                      :is-selected="isSelected"
                      :is-pointed="isPointed"
                      :search="search"
                      :handleOptionClick="handleOptionClick"
                    >
                      {{ option[label] }}
                    </slot>
                  </li>
                </ul>
              </li>
            </template>

            <template v-else>
              <li
                v-for="(option, i, key) in fo"
                :class="classList.option(option)"
                :data-pointed="isPointed(option)"
                :data-selected="isSelected(option) || undefined"
                :key="key"
                @mouseenter="setPointer(option)"
                @click.stop="handleOptionClick(option)"
                :id="ariaOptionId(option)"
                :aria-selected="isSelected(option)"
                :aria-label="ariaOptionLabel(option)"
                role="option"
              >
                <slot
                  name="option"
                  :option="option"
                  :isSelected="isSelected"
                  :is-pointed="isPointed"
                  :search="search"
                >
                  {{ option[label] }}
                </slot>
              </li>
            </template>
          </ul>

          <slot v-if="noOptions && !loading" name="nooptions">
            <div :class="classList.noOptions" v-html="noOptionsText"></div>
          </slot>

          <slot v-if="noResults" name="noresults">
            <div :class="classList.noResults" v-html="noResultsText"></div>
          </slot>

          <slot name="afterlist" :options="fo"></slot>
        </div>
      </teleport>

      <!-- Hacky input element to show HTML5 required warning -->
      <input
        v-if="required"
        :class="classList.fakeInput"
        tabindex="-1"
        :value="textValue"
        required
      />

      <!-- Native input support -->
      <!-- <template v-if="nativeSupport">
        <input v-if="mode == 'single'" type="hidden" :name="name" :value="plainValue !== undefined ? plainValue : ''" />
        <template v-else>
          <input v-for="(v, i) in plainValue" type="hidden" :name="`${name}[]`" :value="v" :key="i" />
        </template>
      </template> -->

      <!-- Screen reader assistive text -->
      <div
        v-if="searchable && hasSelected"
        :class="classList.assist"
        :id="ariaAssist"
        aria-hidden="true"
      >
        {{ ariaLabel }}
      </div>

      <!-- Create height for empty input -->
      <div :class="classList.spacer"></div>
    </div>
  </div>
</template>
<script>
import FormItem from '../FormItem';

import useData from './composables/useData';
import useValue from './composables/useValue';
import useSearch from './composables/useSearch';
import usePointer from './composables/usePointer';
import useOptions from './composables/useOptions';
import usePointerAction from './composables/usePointerAction';
import useDropdown from './composables/useDropdown';
import useMultiselect from './composables/useMultiselect';
import useKeyboard from './composables/useKeyboard';
import useClasses from './composables/useClasses';
import useScroll from './composables/useScroll';
import useA11y from './composables/useA11y';
import usePosition from './composables/usePosition';

import resolveDeps from './utils/resolveDeps';

export default {
  name: 'y-select2',
  extends: FormItem,
  computed: {
    hasError() {
      return this.errors && this.errors.length > 0;
    },
  },
  emits: [
    'paste',
    'open',
    'close',
    'select',
    'deselect',
    'input',
    'search-change',
    'tag',
    'option',
    'update:modelValue',
    'change',
    'clear',
    'keydown',
    'keyup',
    'max',
  ],
  props: {
    value: {
      required: false,
    },
    modelValue: {
      required: false,
    },
    options: {
      type: [Array, Object, Function],
      required: false,
      default: () => [],
    },
    formLabel: {
      type: String,
      required: false,
    },
    id: {
      type: [String, Number],
      required: false,
    },
    name: {
      type: [String, Number],
      required: false,
      default: 'multiselect',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    spinnerBg: {
      type: String,
      default: '#f8fafd',
    },
    spinnerColor: {
      type: String,
      default: '#3663f2',
    },
    left: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: 'label',
    },
    trackBy: {
      type: String,
      required: false,
      default: undefined,
    },
    valueProp: {
      type: String,
      required: false,
      default: 'value',
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    outline: {
      type: Boolean,
      required: false,
      default: true,
    },
    mode: {
      type: String,
      required: false,
      default: 'single', // single|multiple|tags
    },
    outSideClickAccept: {
      type: Boolean,
      required: false,
      default: false,
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      required: false,
      default: -1,
    },
    hideSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
    acceptPaste: {
      type: Boolean,
      required: false,
      default: true,
    },
    createTag: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    createOption: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    appendNewTag: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    appendNewOption: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    addTagOn: {
      type: Array,
      required: false,
      default: undefined,
    },
    addOptionOn: {
      type: Array,
      required: false,
      default: undefined,
    },
    caret: {
      type: Boolean,
      required: false,
      default: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    noOptionsText: {
      type: String,
      required: false,
      default: 'The list is empty',
    },
    noResultsText: {
      type: String,
      required: false,
      default: 'No results found',
    },
    multipleLabel: {
      type: Function,
      required: false,
    },
    object: {
      type: Boolean,
      required: false,
      default: false,
    },
    delay: {
      type: Number,
      required: false,
      default: -1,
    },
    minChars: {
      type: Number,
      required: false,
      default: 0,
    },
    resolveOnLoad: {
      type: Boolean,
      required: false,
      default: true,
    },
    resolveFunction: {
      type: Function,
      required: false,
    },
    filterResults: {
      type: Boolean,
      required: false,
      default: true,
    },
    clearOnSearch: {
      type: Boolean,
      required: false,
      default: false,
    },
    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true,
    },
    canDeselect: {
      type: Boolean,
      required: false,
      default: true,
    },
    canClear: {
      type: Boolean,
      required: false,
      default: false,
    },
    max: {
      type: Number,
      required: false,
      default: -1,
    },
    showOptions: {
      type: Boolean,
      required: false,
      default: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    openDirection: {
      type: String,
      required: false,
      default: 'bottom',
    },
    nativeSupport: {
      type: Boolean,
      required: false,
      default: false,
    },
    classes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    strict: {
      type: Boolean,
      required: false,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      required: false,
      default: true,
    },
    autocomplete: {
      type: String,
      required: false,
    },
    groups: {
      type: Boolean,
      required: false,
      default: false,
    },
    groupLabel: {
      type: String,
      required: false,
      default: 'label',
    },
    groupOptions: {
      type: String,
      required: false,
      default: 'options',
    },
    groupHideEmpty: {
      type: Boolean,
      required: false,
      default: false,
    },
    groupSelect: {
      type: Boolean,
      required: false,
      default: true,
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    attrs: {
      required: false,
      type: Object,
      default: () => ({}),
    },
    onCreate: {
      required: false,
      type: Function,
    },
    customHandlerProps: {
      required: false,
      type: Array,
      default: () => [],
    },
    customOptionClickHandler: {
      required: false,
      type: Function,
    },
    disabledProp: {
      type: String,
      required: false,
      default: 'disabled',
    },
    searchStart: {
      type: Boolean,
      required: false,
      default: false,
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
    regex: {
      type: [Object, String, RegExp],
      required: false,
      default: undefined,
    },
    rtl: {
      type: Boolean,
      required: false,
      default: false,
    },
    infinite: {
      type: Boolean,
      required: false,
      default: false,
    },
    aria: {
      required: false,
      type: Object,
      default: () => ({}),
    },
    clearOnBlur: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    return resolveDeps(props, context, [
      useValue,
      usePointer,
      useDropdown,
      useData,
      useSearch,
      useMultiselect,
      usePosition,
      useOptions,
      useScroll,
      usePointerAction,
      useKeyboard,
      useClasses,
      useA11y,
    ]);
  },
};
</script>
