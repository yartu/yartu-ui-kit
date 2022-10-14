<template>
  <div ref="target" class="relative">
    <div :class="inputContainerClass">
      <label :id="label" class="text-sm font-semibold" v-if="label">
        {{ label }}
      </label>
      <label
        v-if="!inline"
        class="inline-flex flex-1 flex-wrap items-center px-4 py-2.5 border border-BORDER rounded-lg"
        :class="{ '!border-BLUE': showPicker }"
        :id="label"
      >
        <input
          type="text"
          class="outline-none subtitle-5"
          aria-autocomplete="none"
          aria-haspopup="dialog"
          aria-expanded="true"
          inputmode="none"
          tabindex="0"
          :value="selectedDate ? selectedDate.format(formatDate) : ''"
          :placeholder="placeholder"
          @click="open"
        />
        <button @click="open">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4C20.2091 4 22 5.79086 22 8V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V8C2 5.79086 3.79086 4 6 4V3C6 2.44772 6.44772 2 7 2ZM18 6C19.1046 6 20 6.89543 20 8H4C4 6.89543 4.89543 6 6 6H18ZM4 10V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V10H4Z"
              fill="#9AA1B4"
            />
          </svg>
        </button>
      </label>
    </div>
    <transition name="fade">
      <teleport v-if="!inline" to="body">
        <div ref="pickerContainer" v-show="showPicker" :class="pickerClass">
          <y-calendar
            :date="date"
            :time="time"
            :firstDay="firstDay"
            :formatDate="formatDate"
            :eventDate="eventDate"
            :dense="dense"
            :inline="inline"
            v-model="selectedDate"
            class="!p-0"
          ></y-calendar>
          <div v-if="!inline" class="w-full flex flex-wrap gap-3 justify-end">
            <button
              @click="clear"
              class="border border-BORDER rounded-lg px-3 py-2 hover:bg-GREY-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7L17 17"
                  stroke="#9AA1B4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 17L17 7"
                  stroke="#9AA1B4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              @click="emitSelected"
              class="border border-BORDER rounded-lg px-3 py-2 hover:bg-GREY-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5955 6.28757C20.0801 6.71801 20.1374 7.47547 19.7235 7.9794L11.8389 17.5794C11.6247 17.8402 11.3134 17.9932 10.9836 17.9998C10.6539 18.0064 10.3372 17.8659 10.1135 17.6138L5.30586 12.1951C4.87371 11.7081 4.90304 10.9489 5.37138 10.4994C5.83971 10.05 6.56969 10.0805 7.00184 10.5676L10.9282 14.9929L17.9688 6.42064C18.3827 5.91671 19.111 5.85713 19.5955 6.28757Z"
                  fill="#3663F2"
                />
              </svg>
            </button>
          </div>
        </div>
      </teleport>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'y-date-time-picker',
};
</script>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import dayjs from 'dayjs';

const emit = defineEmits(['update', 'update:modelValue', 'close']);
const props = defineProps({
  modelValue: {
    type: [Object, String, Date],
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  dense: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  time: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  firstDay: {
    type: Number,
    default: 0, // Sunday
  },
  formatDate: {
    type: String,
    required: false,
    default: 'YYYY-MM-DD',
  },
  eventDate: {
    type: Array,
    required: false,
    default: () => [],
  },
  inline: {
    type: Boolean,
    required: false,
    default: () => true,
  },
});

const target = ref(null);
const pickerContainer = ref(null);
const showPicker = ref(false);

onClickOutside(
  target,
  () => {
    showPicker.value = false;
  },
  { ignore: [pickerContainer] },
);

const open = () => {
  showPicker.value = true;
  calculatePosition();
};

const clear = () => {
  emit('update', '');
  emit('update:modelValue', '');
  showPicker.value = false;
  selectedDate.value = '';
};

const selectedDate = ref(dayjs(props.modelValue));

const emitSelected = () => {
  emit('update', selectedDate.value);
  emit('update:modelValue', selectedDate.value);
  showPicker.value = false;
};

const calculatePosition = () => {
  let container = target.value.getBoundingClientRect();
  let pickerContainerStyle = pickerContainer.value.style;
  pickerContainerStyle.top = container.bottom + 16 + 'px';
  pickerContainerStyle.left = container.left + 'px';
};

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const changeButtonClass = computed(() => {
  return [
    'flex items-center justify-center',
    'hover:bg-GREY-3 ',
    'rounded-full',
    { 'w-10 h-10': !props.dense, 'w-7 h-7': props.dense },
  ];
});

const thClass = computed(() => {
  return ['font-semibold capitalize text-BLACK-2 text-xs text-center'];
});

const inputContainerClass = computed(() => {
  return ['text-BLACK-2', 'inline-flex flex-col gap-2'];
});

const buttonClass = computed(() => {
  return [
    'p-0 relative text-BLACK-2 text-xs text-center hover:bg-GREY-3 rounded-full',
    { 'w-10 h-10': !props.dense, 'w-7 h-7': props.dense },
  ];
});

const pickerClass = computed(() => {
  return [
    'flex flex-col justify-center items-center',
    'mt-1',
    'bg-white',
    'rounded-lg border border-BORDER',
    {
      'absolute z-50': !props.inline,
      'px-8 py-4': !props.dense,
      'px-4 py-2': props.dense,
    },
  ];
});
</script>

<style>
.yartu-date-picker-table-calc-width {
  width: calc(100% + 1rem);
}

.am-selector:checked + p {
  color: white;
}

.pm-selector:checked + p {
  color: white !important;
}

.calc-width-for-date-picker {
  width: calc(100% - 1rem);
}
</style>
