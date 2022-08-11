<template>
  <label
    :for="id"
    class="inline-flex flex-col text-sm gap-2 text-BLACK-2 min-h-[64px] min-w-[200px]"
  >
    <div class="inline-flex justify-between gap-x-6 font-semibold">
      <label :for="id">
        {{ title }}
      </label>
      <span class="text-GREY-1" v-if="modelValue">
        {{ modelValue.length }} / {{ maxlength }}
      </span>
    </div>
    <label
      :for="id"
      class="focus-within:border-BLUE relative py-3 px-4 border border-BORDER rounded-lg bg-LIGHTBLUE-6"
    >
      <div
        class="absolute bg-transparent pointer-events-none text-base w-4 h-4 bottom-4 right-3"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3333 12.3477V15.3343H12.3467L15.3333 12.3477Z"
            fill="#9AA1B4"
          />
          <path
            d="M15.333 7.67969V10.3197L10.3197 15.333H7.67969L15.333 7.67969Z"
            fill="#9AA1B4"
          />
          <path
            d="M15.3327 3.01172V5.65172L5.65269 15.3317H3.0127L15.3327 3.01172Z"
            fill="#9AA1B4"
          />
        </svg>
      </div>
      <textarea
        :class="yTextAreaClass"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :id="id"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :cols="cols"
        :rows="rows"
        :wrap="wrap"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :name="name"
        :spellcheck="spellcheck"
        :readonly="readonly"
        :required="required"
      ></textarea>
    </label>
    <div class="text-GREY-1 font-normal text-sm">
      <slot name="helper"></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: 'y-text-area',
};
</script>

<script setup>
import { computed } from '@vue/reactivity';

defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  wrap: {
    type: String,
    required: false,
  },
  rows: {
    type: Number,
    required: false,
  },
  cols: {
    type: Number,
    required: false,
  },
  maxlength: {
    type: Number,
    required: false,
  },
  minlength: {
    type: Number,
    required: false,
  },
  readonly: {
    type: Boolean,
    required: false,
  },
  spellcheck: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  autofocus: {
    type: Boolean,
    required: false,
  },
  required: {
    type: Number,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  helperMessage: {
    type: String,
    required: false,
  },
  modelValue: null,
});

const yTextAreaClass = computed(() => {
  return [
    'yartu-text-area',
    'focus:outline-none',
    'resize',
    'disabled:text-GREY-1 disabled:cursor-not-allowed',
    'cursor-auto ',
    'min-h-[64px] max-w-full h-full min-w-full',
    'bg-LIGHTBLUE-6',
  ];
});
</script>

<style>
.yartu-text-area::-webkit-resizer {
  display: none;
}
.yartu-text-area::-webkit-scrollbar {
  width: 0.5rem;
}
/* Track */
.yartu-text-area::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #edf2f7;
}
/* Handle */
.yartu-text-area::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 100vh;
  border: 1px solid #edf2f7;
}
/* Handle on hover */
.yartu-text-area::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
.yartu-text-area::-webkit-scrollbar-button {
  display: none;
}
.yartu-text-area::-webkit-scrollbar-corner {
  display: none;
}
</style>
