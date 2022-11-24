<template>
  <div :class="inputContainerClass">
    <label :id="id" class="text-sm font-semibold" v-if="label">
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
        v-model="modelData.value"
        @input="emitModel()"
        :class="inputClass"
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
        <div :class="iconClass" v-if="action">
          <slot name="icon"></slot>
        </div>
        <div ref="optionsContainer">
          <button
            v-if="dropdown && !disabled"
            @click="open = !open"
            class="flex justify-center items-center w-6 h-6 text-GREY-1 absolute rounded-full right-4 text-sm"
          >
            {{ modelData.select }}
            <i :class="dropdownIcon" aria-hidden="true"></i>
          </button>
          <div v-if="dropdown" :class="dropdownClass">
            <ol>
              <li
                :class="listClass"
                v-for="(item, index) in dropdownItem"
                :key="index"
                @click="modelData.select = item; emitModel();"
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
    modelData: {
      value: '',
      select: '',
    },
  }),
  mounted() {
    onClickOutside(this.$refs.optionsContainer, () => (this.open = false));
  },
  created() {
    this.initModel();
  },
  methods: {
    initModel() {
      this.modelData.value = this.modelValue
      if (typeof this.modelValue === 'object') {
        this.modelData.value = this.modelValue.value;
        this.modelData.select = this.modelValue.select;
      } else {
        this.modelData.value = this.modelValue;
        if (this.dropdownModel) {
          this.modelData.select = this.dropdownMdel;
        }
      }
    },
    emitModel() {
      if (this.dropdown) {
        const data = this.modelData;
        this.$emit('update:modelValue', data);
      } else {
        this.$emit('update:modelValue', this.modelData.value);
      }
      this.open = false;
    },
  },
  watch: {
    modelValue: {
      handler: function () {
        this.initModel();
      },
      deep: true,
    },
  },
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
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasError() {
      return this.error || this.errors.length > 0;
    },

    inputContainerClass() {
      return ['text-BLACK-2', 'flex flex-col gap-2'];
    },

    inputContentClass() {
      return ['relative', 'flex items-center'];
    },
    inputClass() {
      return [
        'relative',
        'min-w-[200px]',
        'flex-1',
        'border border-BORDER rounded-lg text-sm',
        'focus:outline-none',
        'w-full',
        'focus:border-BLUE',
        {
          'pr-11': this.iconRight && this.action && !this.dropdown,
          'pl-11': !this.iconRight && this.action,
          'pr-14': this.dropdown,
          'border-RED focus:border-RED': this.hasError,
          'border-YELLOW focus:border-YELLOW': this.warning,
          'border-BLUE focus:border-BLUE': this.info,
          'p-1.5 px-3': this.dense,
          'p-3 h-11': !this.dense,
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

    iconClass() {
      return [
        'flex justify-center items-center',
        'text-GREY-1',
        'absolute',
        'rounded-full',
        {
          'right-4': this.iconRight && this.action,
          'left-4': !this.iconRight && this.action,
        },
      ];
    },

    prefixClass() {
      return [
        'flex justify-center items-center',
        'text-GREY-1',
        'absolute',
        'left-4',
        'z-1',
      ];
    },

    suffixClass() {
      return [
        'flex justify-center items-center',
        'text-GREY-1',
        'absolute',
        'right-4',
        'z-1',
      ];
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
