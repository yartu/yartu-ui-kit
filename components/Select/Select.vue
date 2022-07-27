<template>
  <div class="relative">
    <button
      @click="open = !open"
      :class="open ? 'border-BLUE' : 'border-BORDER '"
      class="w-full border py-2 px-3 rounded-lg text-BLACK-2 font-semibold flex flex-wrap justify-between gap-2"
    >
      <p class="text-BLACK-2 font-semibold text-sm">{{ label }}</p>
      <span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10.5L12 16.5L18 10.5L6 10.5Z" fill="#9AA1B4" />
        </svg>
      </span>
    </button>
    <div
      :class="open ? 'max-h-52 py-2 border' : 'max-h-0 py-0 border-none'"
      class="block absolute z-14 bg-white border-Border overflow-y-auto rounded-lg mt-2 transition-all duration-300 min-w-min"
    >
      <select-inputs
        v-for="(item, index) in items"
        :key="index"
        :value="item"
        v-model="model"
        :active="setActive(item)"
        :multiple="multiple"
      >
      </select-inputs>
    </div>
  </div>
</template>

<script>
import SelectInputs from '../SelectInputs/SelectInputs.vue';

export default {
  name: 'y-select',
  data() {
    return {
      open: false,
    };
  },
  components: {
    'select-inputs': SelectInputs,
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
    hint: {
      type: String,
      default: '',
    },
    persistentHint: {
      type: Boolean,
      default: false,
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
  methods: {
    setActive(item) {
      return this.model.includes(item);
    },
  },
};
</script>

<style></style>
