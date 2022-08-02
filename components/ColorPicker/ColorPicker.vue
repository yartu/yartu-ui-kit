<template>
  <div
    class="inline-flex bg-white border border-BORDER rounded-lg p-4 max-w-[264px]"
  >
    <div class="flex flex-wrap gap-x-2.5 gap-y-2">
      <label
        v-for="(item, index) in colorPalette"
        :key="index"
        :for="item"
        class="relative w-6 h-6 rounded-full"
        :class="disabled ? 'y-color-swatches' : ''"
        :style="'background-color:' + item"
      >
        <input
          :id="item"
          :value="item"
          type="radio"
          :disabled="disabled"
          v-model="model"
          class="appearance-none cursor-pointer absolute inset-0 rounded-full checked:ring-2 ring-BLUE ring-offset-2 disabled:cursor-not-allowed"
        />
      </label>
    </div>
  </div>
</template>

<script>
import colors from '../../utils/colors';

export default {
  name: 'y-color-picker',
  data() {
    return {
      colorPalette: null,
    };
  },
  props: {
    colors: {
      type: Object,
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
    modelValue: null,
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
  },
  mounted() {
    if (!this.$props.colors) {
      this.colorPalette = new Array();
      for (let index = 0; index < Object.keys(colors).length; index++)
        this.colorPalette[index] = Object.values(colors)[index].base;
    } else {
      this.colorPalette = this.$props.colors;
    }
  },
};
</script>

<style>
.y-color-swatches {
  opacity: 0.3;
}
</style>
