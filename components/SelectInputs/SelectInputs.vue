<template>
  <div class="px-5 py-3 hover:bg-GREY-3 cursor-pointer relative">
    <label
      :for="value"
      class="text-BLACK-2 font-semibold text-sm relative z-1 cursor-pointer flex flex-wrap gap-2"
    >
      <span v-if="active">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11.4844L11.1667 16L18 8"
            stroke="#3663F2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      {{ value }}
    </label>
    <input
      :id="value"
      :value="value"
      v-model="model"
      :type="multiple ? 'checkbox' : 'radio'"
      class="appearance-none absolute inset-0 cursor-pointer"
      :class="active ? 'checked:bg-LIGHTBLUE-4' : 'checked:bg-GREY-3'"
    />
  </div>
</template>

<script>
export default {
  name: 'y-select-inputs',
  props: {
    modelValue: null,
    multiple: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
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
};
</script>

<style></style>
