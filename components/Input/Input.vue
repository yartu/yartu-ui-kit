<template>
  <div :class="inputContainerClass">
    <label
      :id="id"
      class="text-sm font-semibold"
      :class="disabled ? 'text-GREY-1' : ''"
      v-if="label"
    >
      {{ label }}
    </label>
    <div :class="inputContentClass">
      <div :class="prefixClass" v-if="prefix">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>
      <input
        v-if="disabled && disabledText"
        :class="inputClass"
        :value="disabledText"
        type="text"
        disabled
      />
      <input
        v-else
        :id="id"
        ref="yartuInput"
        @blur="setFocusState(false)"
        @focus="setFocusState(true)"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('change')"
        :class="[inputClass, inputClasses]"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <div>
        <div :class="suffixClass" v-if="suffix">
          <slot name="suffix">
            {{ suffix }}
          </slot>
        </div>
        <div ref="optionsContainer">
          <slot
            name="dropdown"
            :open="openDropdown"
            :selected="dropdownSelected"
          >
          </slot>
          <div v-if="dropdown" :class="dropdownClass">
            <ol>
              <li
                :class="listClass"
                v-for="(item, index) in dropdownItem"
                :key="index"
                @click="setDropdownSelected(item)"
              >
                {{ item }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div :class="helperClass" v-if="helper">
      <slot name="helper"> </slot>
      <div v-if="errors.length > 0">
        {{ errors.join(',') }}
      </div>
    </div>
  </div>
</template>

<script>
import FormItem from '../FormItem';
import { onClickOutside } from '@vueuse/core';

export default {
  name: 'y-input',
  extends: FormItem,
  data: () => ({
    open: false,
    focused: false,
  }),

  mounted() {
    onClickOutside(this.$refs.optionsContainer, () => (this.open = false));
  },

  methods: {
    openDropdown() {
      this.open = true;
    },
    focus() {
      this.$refs.yartuInput.focus();
    },
    setFocusState(e) {
      if (e) {
        this.focused = true;
        return;
      }
      this.focused = false;
    },
    setDropdownSelected(item) {
      this.dropdownSelected = item;
    },
  },
  emits: ['update:modelValue', 'update:dropdownModel', 'change'],
  props: {
    modelValue: {
      type: [String, Number, Object],
    },
    id: null,
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    dropdownIcon: {
      type: String,
      default: '',
    },
    disabledText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dropdown: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    dropdownModel: {
      type: String,
      default: '',
    },
    dropdownItem: {
      type: Array,
      default: null,
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
    helper: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: Boolean,
      default: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    inputClasses: String,
  },
  computed: {
    dropdownSelected: {
      get() {
        if (this.dropdownModel) {
          return this.dropdownModel;
        }
        return '';
      },
      set(val) {
        this.$emit('update:dropdownModel', val);
      },
    },
    hasError() {
      return this.error || this.errors.length > 0;
    },
    inputContainerClass() {
      return ['text-BLACK-2', 'flex flex-col gap-2', 'relative'];
    },
    inputContentClass() {
      return [
        'relative',
        'flex items-center',
        'border border-BORDER rounded-lg',
        'text-sm',
        {
          'border-RED focus:border-RED': this.hasError,
          'border-YELLOW focus:border-YELLOW': this.warning,
          'border-BLUE focus:border-BLUE': this.info || this.focused,
          'rounded-full text-sm': this.rounded,
        },
      ];
    },
    inputClass() {
      return [
        'relative',
        'flex-1',
        'focus:outline-none',
        'w-full',
        'mr-[0.063rem]',
        'bg-transparent',
        {
          'p-2 text-xs': this.dense,
          'p-3 body-1': !this.dense,
          'py-2': this.rounded,
          'bg-GREY-3 rounded-lg !text-GREY-1': this.disabled,
        },
      ];
    },
    helperClass() {
      return [
        'text-xs',
        'flex gap-1 items-center',
        {
          'text-RED': this.hasError,
          'text-BLUE': this.info,
          'text-YELLOW': this.warning,
        },
      ];
    },
    prefixClass() {
      return ['flex justify-center items-center', 'text-GREY-1'];
    },
    suffixClass() {
      return ['flex justify-center items-center', 'text-GREY-1'];
    },
    dropdownClass() {
      return [
        'absolute',
        'z-10',
        'overflow-hidden',
        'mt-2 py-2',
        'right-0 top-full',
        'flex flex-col',
        'rounded-lg',
        'bg-WHITE',
        'border-BORDER border',
        'text-BLACK-2',
        'shadow-1',
        'transition-all duration-300',
        {
          'min-h-fit': this.open,
          'max-h-0 !p-0 border-none': !this.open,
        },
      ];
    },
    listClass() {
      return [
        'py-2 px-4',
        'w-full',
        'cursor-pointer',
        'text-sm',
        'hover:bg-GREY-3',
      ];
    },
  },
};
</script>
