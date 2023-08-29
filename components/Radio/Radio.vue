<template>
  <label :for="id" :class="radioButtonContainer">
    <input
      type="radio"
      v-model="model"
      :id="id"
      :value="inputValue"
      :checked="checked"
      :disabled="disabled"
      :class="radioButtonClass"
      :style="setStyle"
    />
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'y-radio',
  props: {
    label: {
      type: String,
      default: '',
    },
    id: null,
    color: {
      type: String,
      default: '#ffffff',
    },
    bgColor: {
      type: String,
      default: '#3663f2',
    },
    borderColor: {
      type: String,
      default: '#e5ebf5ff',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: null,
    inputValue: null,
  },
  computed: {
    checked() {
      return this.inputValue === this.modelValue;
    },
    model: {
      cache: false,
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    radioButtonContainer() {
      return ['w-fit', 'inline-flex items-center justify-center gap-2'];
    },
    radioButtonClass() {
      return [
        'y-radio-button',
        'rounded-full',
        'text-BLUE bg-WHITE',
        'border-2 border-BORDER',
        'select-none',
        'bg-origin-border',
        'inline-block',
        'cursor-pointer',
        'align-middle',
        'appearance-none',
        'w-[18px] h-[18px]',
        'hover:bg-GREY-5',
        'checked:!border-transparent',
        'checked:bg-current',
        'checked:bg-center',
        'checked:disabled:!bg-LIGHTBLUE-3',
        'disabled:border-GREY-2',
        'disabled:bg-white',
        'disabled:hover:cursor-not-allowed',
      ];
    },
    setStyle() {
      return [
        'border-color:' + this.borderColor + ';',
      ];
    },
  },
};
</script>

<style>
.y-radio-button:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 18 18' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='9' cy='9' r='4.5'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-color: v-bind(bgColor);
}
.y-radio-button:checked:hover {
  background-color: v-bind(bgColor + 'd1' );
}

</style>
