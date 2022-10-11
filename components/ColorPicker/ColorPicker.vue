<template>
  <div
    class="inline-flex flex-col gap-4 bg-white border border-BORDER rounded-lg p-4 max-w-[264px]"
  >
    <h1 class="subtitle-5" v-if="label">{{ label }}</h1>
    <div :class="containerClass">
      <label
        v-for="(item, index) in colorPalette"
        :key="index"
        :for="item"
        :class="swatchClass"
        :style="'background-color:' + item"
      >
        <input
          :id="item"
          :value="item"
          type="radio"
          :disabled="disabled"
          v-model="model"
          :class="inputClass"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-color-picker',
};
</script>

<script setup>
import { computed, onMounted, ref } from 'vue';
import colors from '../../utils/colors';

const colorPalette = ref([]);

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  colors: {
    type: Object,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  showSwatches: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'sm',
  },
  modelValue: null,
});

onMounted(() => {
  if (!props.colors) {
    colorPalette.value = [];
    for (let index = 0; index < Object.keys(colors).length; index++)
      colorPalette.value[index] = Object.values(colors)[index].base;
  } else {
    colorPalette.value = props.colors;
  }
});

const model = computed({
  cache: false,
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const containerClass = computed(() => {
  return [
    'flex flex-wrap',
    {
      'gap-x-2.5 gap-y-2': props.size === 'sm',
      'gap-x-3 gap-y-2': props.size === 'md',
      'gap-x-4 gap-y-2': props.size === 'lg',
    },
  ];
});

const swatchClass = computed(() => {
  return [
    'relative',
    'rounded-full',
    {
      'w-6 h-6': props.size === 'sm',
      'w-7 h-7': props.size === 'md',
      'w-8 h-8': props.size === 'lg',
      'opacity-30': props.disabled,
    },
  ];
});

const inputClass = computed(() => {
  return [
    'appearance-none',
    'cursor-pointer',
    'absolute inset-0',
    'rounded-full ',
    'checked:ring-2',
    'ring-BLUE ring-offset-2',
    'disabled:cursor-not-allowed',
  ];
});
</script>
