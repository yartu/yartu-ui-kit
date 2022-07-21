<template>
  <label :for="inputValue" :class="switchContainerClass">
    <input
      :id="inputValue"
      :class="switchClass"
      v-model="model"
      :value="inputValue"
      :checked="checked"
      :disabled="disabled"
      type="checkbox"
    />
    <span :class="dotClass"><slot></slot></span>
    <span :class="switchLabelClass"></span>
  </label>
</template>
<script>
export default {
  name: 'y-switch',
  props: {
    color: {
      type: String,
      default: '#ffffff',
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    borderColor: {
      type: String,
      default: '#e5ebf5ff',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {},
    inputValue: {
      type: String,
      required: true,
    },
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
    switchContainerClass() {
      return [
        'relative',
        'w-[34px] h-[14px]',
        'inline-block',
        'y-switch-container',
      ];
    },
    switchClass() {
      return ['opacity-0', 'w-0 h-0', 'y-switch'];
    },
    switchLabelClass() {
      return [
        'absolute',
        'cursor-pointer',
        'top-0 left-0 right-0 bottom-0',
        'bg-GREY-2',
        'rounded-xl',
        'hover:bg-GREY-7',
        'y-switch-bg',
      ];
    },
    dotClass() {
      return [
        'rounded-full',
        'absolute',
        'z-[1]',
        'h-5 w-5',
        'bg-GREY-1',
        'select-none',
        'text-white',
        'transition-all duration-300',
        '-left-0.5',
        '-bottom-[3px]',
        'shadow',
        'cursor-pointer',
        'flex items-center justify-center',
        'dot',
        'overflow-hidden',
      ];
    },
    setStyle() {
      return [
        'color:' + this.color + ';',
        'background-color:' + this.bgColor + ';',
        'border-color:' + this.borderColor + ';',
      ];
    },
  },
};
</script>

<style>
.y-switch-container:hover > .dot {
  background-color: #7b849d;
}
.y-switch-container:hover > .y-switch:checked:hover + .dot {
  background-color: #0e3dd3;
}
.y-switch-container:hover > .y-switch-bg {
  background-color: #969db180;
}
.y-switch:checked + .dot {
  background-color: #3663f2;
  transform: translateX(1rem);
}
.y-switch:disabled + .dot {
  cursor: not-allowed;
}
.y-switch:disabled ~ .y-switch-bg {
  cursor: not-allowed;
}
.y-switch:checked ~ .y-switch-bg {
  background-color: #0e3dd333;
}
.y-switch:checked:hover ~ .y-switch-bg {
  background-color: #0e3dd333;
}
.y-switch:checked:disabled + .dot {
  background-color: #98aef6;
}
.y-switch-container:hover > .y-switch:checked:disabled:hover + .dot {
  background-color: #98aef6;
}
</style>
