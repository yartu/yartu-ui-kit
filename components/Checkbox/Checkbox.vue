<template>
  <label :for="id" :class="checkboxContainer">
    <input
      type="checkbox"
      v-model="model"
      :id="id"
      :value="inputValue"
      :checked="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :class="checkboxClass"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'y-checkbox',
  props: {
    bg: {
      type: Boolean,
      default: false,
    },
    id: null,
    label: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    'indeterminate': {
      type: Boolean,
      default: false,
    },
    modelValue: {},
    inputValue: null,
  },
  computed: {
    model: {
      cache: false,
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    checkboxContainer() {
      return [
        'w-fit',
        'inline-flex items-center justify-center flex-wrap gap-2',
      ];
    },
    checkboxClass() {
      return [
        'y-checkbox',
        'appearance-none',
        'bg-white',
        'w-4 h-4',
        'cursor-pointer',
        'rounded',
        'relative',
        'border-2 border-BORDER',
        'checked:bg-BLUE',
        'checked:hover:bg-HOVER-BLUE',
        'hover:bg-GREY-2',
        'checked:disabled:!bg-LIGHTBLUE-3',
        'disabled:hover:bg-white',
        'disabled:hover:cursor-not-allowed',
        'disabled:border-BORDER',
        'checked:!border-transparent',
        'indeterminate:bg-BLUE',
        'indeterminate:border-0',
        'indeterminate:hover:bg-HOVER-BLUE',
        'indeterminate:disabled:bg-GREY-2',
        'indeterminate:disabled:hover:bg-GREY-2',
        'indeterminate:disabled:hover:cursor-not-allowed',
        'bg-no-repeat bg-center ',
        {
          'bg-GREY-2': this.bg,
        },
      ];
    },
  },
};
</script>

<style>
.y-checkbox:checked {
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M7.32781 0.544271C7.60827 0.817002 7.61453 1.26545 7.3418 1.54591L3.55329 5.44174C3.41845 5.5804 3.23278 5.65789 3.03938 5.65622C2.84598 5.65456 2.66167 5.57389 2.52924 5.43293L0.651083 3.43385C0.383219 3.14875 0.397199 2.70047 0.682309 2.43261C0.967418 2.16474 1.41569 2.17872 1.68356 2.46383L3.0543 3.92282L6.32617 0.55826C6.5989 0.277803 7.04735 0.271539 7.32781 0.544271Z' fill='white'/></svg>");
  background-size: 12px;
}
.y-checkbox:indeterminate {
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg width='8' height='2' viewBox='0 0 8 2' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M0 1C0 0.585786 0.339555 0.25 0.758417 0.25H7.24158C7.66045 0.25 8 0.585786 8 1C8 1.41421 7.66045 1.75 7.24158 1.75H0.758417C0.339555 1.75 0 1.41421 0 1Z' fill='white'/></svg>");
  background-size: 8px;
}
</style>
