<template>
  <div
    class="inline-flex flex-col gap-4 bg-white border border-BORDER rounded-lg p-4 max-w-[264px]"
  >
    <h1 class="subtitle-5" v-if="label">
      {{ label }}
    </h1>
    <div
      :class="[containerClass, { 'border-RED border rounded-lg px-3 py-4': errors.length > 0 }]"
    >
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
          v-model="model"
          :disabled="disabled"
          :class="inputClass"
        />
      </label>
    </div>
    <div v-if="errors.length > 0">
      <h1 class="text-xs" :class="{ 'text-RED': errors.length > 0 }">
        {{ errors.join(",") }}
      </h1>
    </div>
  </div>
</template>

<script>

import FormItem from "../FormItem";

export default {
  name: "y-color-picker",
  extends: FormItem,
};
</script>

<script setup>
import { computed, onMounted, ref } from "vue";
import colors from "../../utils/colors";

const colorPalette = ref([]);

const emit = defineEmits(["update:modelValue", "update"]);
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
    default: "sm",
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
    emit("update:modelValue", val);
    emit('update', val);
  },
});

const containerClass = computed(() => {
  return [
    "flex flex-wrap",
    {
      "gap-2": props.size === "xs",
      "gap-x-2.5 gap-y-2": props.size === "sm",
      "gap-x-3 gap-y-2": props.size === "md",
      "gap-x-4 gap-y-2": props.size === "lg",
    },
  ];
});

const swatchClass = computed(() => {
  return [
    "relative",
    "rounded-full",
    {
      "w-4 h-4": props.size === "xs",
      "w-6 h-6": props.size === "sm",
      "w-7 h-7": props.size === "md",
      "w-8 h-8": props.size === "lg",
      "opacity-30": props.disabled,
    },
  ];
});

const inputClass = computed(() => {
  return [
    "appearance-none",
    "cursor-pointer",
    "absolute inset-0",
    "rounded-full ",
    "checked:ring-2",
    "ring-BLUE ring-offset-2",
    "disabled:cursor-not-allowed",
  ];
});

</script>
