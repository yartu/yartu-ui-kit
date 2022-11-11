<template>
  <div
    class="border border-BORDER rounded-full p-1 flex items-center gap-1 justify-center bg-LIGHTBLUE-6"
  >
    <div
      v-for="(option, index) of options"
      :key="index"
      class="flex items-center gap-1 justify-center"
    >
      <label
        class="w-24 p-1 flex items-center justify-center rounded-full gap-2 subtitle-4 text-BLACK-2 cursor-pointer relative"
        :title="option.title"
      >
        <input
          type="radio"
          :value="option[dataKey]"
          @input="emitModelValue($event.target.value)"
          class="appearance-none checked:bg-white checked:shadow-5 rounded-full absolute inset-0 transition-all duration-300"
        />
        <slot name="option" :option="option" :index="index">
          <span v-if="optionLabel" class="subtitle-4 text-BLACK-2 truncate relative z-1">
            {{ option[optionLabel] }}
          </span>
        </slot>
      </label>
      <div v-if="option.separator" class="h-5 w-px bg-BORDER"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-button-group',
};
</script>

<script setup>
const emit = defineEmits(['update:modelValue', 'clicked']);

defineProps({
  modelValue: null,
  optionLabel: {
    required: true,
  },
  dataKey: {
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const emitModelValue = (option) => {
  emit('update:modelValue', option);
  emit('clicked', option);
};
</script>
