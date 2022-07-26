<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="border border-BORDER py-2 px-3 rounded-lg text-BLACK-2 font-semibold flex flex-wrap justify-between"
    >
      <p class="text-BLACK-2 font-semibold text-sm">{{ label }}</p>
    </button>
    <div
      :class="open ? 'max-h-52 py-2 border' : 'max-h-0 py-0 border-none'"
      class="inline-block border-Border overflow-y-auto rounded-lg mt-2 transition-all duration-300"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="px-5 py-3 hover:bg-GREY-3 cursor-pointer relative"
      >
        <label
          :for="item"
          class="text-BLACK-2 font-semibold text-sm relative z-1 cursor-pointer"
        >
          {{ item }}
        </label>
        <input
          :id="item"
          :value="item"
          v-model="model"
          :type="multiple ? 'checkbox' : 'radio'"
          class="appearance-none absolute inset-0 cursor-pointer checked:bg-GREY-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-select',
  data() {
    return {
      open: false,
    };
  },
  props: {
    modelValue: null,
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: '',
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
        if (!this.$props.multiple) {
          this.open = false;
        }
      },
    },
  },
};
</script>

<style></style>
