<template>
  <div class="relative">
    <div ref="target" :class="inputContainerClass">
      <label :id="label" class="text-sm font-semibold" v-if="label">
        {{ label }}
      </label>
      <slot
        v-if="!inline"
        name="activator"
        :open="open"
        :value="showDateWithFormat"
      >
        <label
          class="flex flex-1 items-center px-4 py-2 border border-BORDER rounded-lg"
          :class="{ '!border-BLUE': showPicker }"
          :id="label"
        >
          <input
            type="text"
            class="outline-none subtitle-5 text-BLACK-2 flex-1"
            aria-autocomplete="none"
            aria-haspopup="dialog"
            aria-expanded="true"
            inputmode="none"
            tabindex="0"
            :value="showDateWithFormat"
            :placeholder="placeholder"
            @click="open"
          />
          <button type="button" @click="open">
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
      </slot>
    </div>
    <transition name="fade">
      <teleport v-if="!inline" to="body">
        <div ref="pickerContainer" v-show="showPicker" :class="pickerClass">
          <div v-if="preset" class="flex flex-col gap-2 mb-4">
            <p class="text-sm text-GREY-1 font-semibold pb-1">PRESET</p>
            <div class="flex items-center gap-2">
              <button
                @click="emitPreset(presetList.tomorrow)"
                class="flex flex-col relative px-4 py-2 border border-BORDER rounded-lg flex cursor-pointer w-36"
              >
                <p class="text-sm text-BLACK-2 font-semibold">Tomorrow</p>
                <p class="text-sm text-GREY-1">
                  {{ presetList.tomorrow.format("DD MMM HH:mm") }}
                </p>
              </button>
              <button
                @click="emitPreset(presetList.twoDayAfter)"
                class="flex flex-col relative px-4 py-2 border border-BORDER rounded-lg flex cursor-pointer w-36"
              >
                <p class="text-sm text-BLACK-2 font-semibold">2 day after</p>
                <p class="text-sm text-GREY-1">
                  {{ presetList.twoDayAfter.format("DD MMM HH:mm") }}
                </p>
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="emitPreset(presetList.fourDayAfter)"
                class="flex flex-col relative px-4 py-2 border border-BORDER rounded-lg flex cursor-pointer w-36"
              >
                <p class="text-sm text-BLACK-2 font-semibold">4 day after</p>
                <p class="text-sm text-GREY-1">
                  {{ presetList.fourDayAfter.format("DD MMM HH:mm") }}
                </p>
              </button>
              <button
                @click="emitPreset(presetList.oneWeekAfter)"
                class="flex flex-col relative px-4 py-2 border border-BORDER rounded-lg flex cursor-pointer w-36"
              >
                <p class="text-sm text-BLACK-2 font-semibold">1 week after</p>
                <p class="text-sm text-GREY-1">
                  {{ presetList.oneWeekAfter.format("DD MMM HH:mm") }}
                </p>
              </button>
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <y-calendar
              @update="emitSelected($event, false)"
              @monthChange="$emit('monthChange')"
              :firstDay="firstDay"
              :formatDate="formatDate"
              :eventDate="eventDate"
              dense
              inline
              :min="min"
              :max="max"
              :time24h="time24h"
              v-model="selectedDate"
              class="!p-0"
            ></y-calendar>
            <y-time-picker
              v-if="time"
              @update="emitSelected($event, false)"
              v-model="selectedTime"
              :outline="false"
              inline
              dense
            ></y-time-picker>
          </div>
          <div
            v-if="!inline && buttons"
            class="w-full flex flex-wrap gap-3 justify-end"
          >
            <button
              @click="clear"
              class="border border-BORDER rounded-lg px-2 py-1 hover:bg-GREY-3 h-fit"
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
              @click="emitSelected(null, true)"
              class="border border-BORDER rounded-lg px-2 py-1 hover:bg-GREY-3 h-fit"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

import dayjs from 'dayjs';

const emit = defineEmits([
  'update',
  'update:modelValue',
  'monthChange',
  'close',
]);
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
  top: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Boolean,
    required: false,
    default: false,
  },
  preset: {
    type: Boolean,
    required: false,
    default: false,
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
  formatTime: {
    type: String,
    required: false,
    default: 'HH:mm',
  },
  eventDate: {
    type: Array,
    required: false,
    default: () => [],
  },
  inline: {
    type: Boolean,
    required: false,
    default: true,
  },
  time24h: {
    type: Boolean,
    default: false,
  },
  min: {
    type: [Date, Object],
    required: false,
  },
  max: {
    type: [Date, Object],
    required: false,
  },
  buttons: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const target = ref(null);
const pickerContainer = ref(null);
const showPicker = ref(false);
const now =
  props.modelValue && !isNaN(props.modelValue.$D)
    ? dayjs(props.modelValue, props.formatDate)
    : dayjs();
const selectedDate = ref(props.modelValue ? props.modelValue : now);
const selectedTime = ref(props.modelValue ? props.modelValue : now);
const presetList = ref({
  tomorrow: now.add(1, "day"),
  twoDayAfter: now.add(2, "day"),
  fourDayAfter: now.add(4, "day"),
  oneWeekAfter: now.add(1, "week"),
});

const open = () => {
  showPicker.value = true;
  selectedDate.value = props.modelValue ? props.modelValue : now;
  selectedTime.value = props.modelValue ? props.modelValue : now;
  calculatePosition();
};

const clear = () => {
  emit('update', null);
  emit('update:modelValue', null);
  showPicker.value = false;
  selectedDate.value = null;
};

const emitPreset = (preset) => {
  emit("update", preset);
  emit("update:modelValue", preset);
  showPicker.value = false;
};

const emitSelected = (event, closePicker = false) => {
  if (props.time && selectedTime.value) {
    selectedDate.value = selectedDate.value
      .set('hour', selectedTime.value.hour())
      .set('minute', selectedTime.value.minute());
  }
  emit('update', selectedDate.value);
  emit('update:modelValue', selectedDate.value);
  if(closePicker === true) {
    showPicker.value = false;
  }
};

const showDateWithFormat = computed(() => {
  let value = "";
  if (!props.modelValue) return "";
  if (typeof selectedDate.value !== "string") {
    value = selectedDate.value.format(props.formatDate);
    if (selectedTime && props.time) {
      value = `${value} ${selectedTime.value.format(props.formatTime)}`;
    }
    return value;
  }
  return selectedDate.value;
});

const calculatePosition = () => {
  let container = target.value.getBoundingClientRect();
  let pickerContainerStyle = pickerContainer.value.style;
  let containerWidth = props.time ? 340 : 220;

  if (props.top) {
    pickerContainerStyle.top = container.top - 16 + 'px';
  } else {
    pickerContainerStyle.top = container.bottom + 'px';
  }
  if (props.left) pickerContainerStyle.left = container.left + 'px';
  else {
    pickerContainerStyle.left = container.right - containerWidth + 'px';
  }
};

onClickOutside(
    target,
    () => {
      if (showPicker.value) {
        emitSelected(null, false);
        emit('close');
      }
      showPicker.value = false;
    },
    { ignore: [pickerContainer] },
);

onMounted(() => {
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const inputContainerClass = computed(() => {
  return ['text-BLACK-2', 'flex flex-col gap-2'];
});

const pickerClass = computed(() => {
  return [
    'flex flex-col justify-center items-center',
    'mt-1',
    'shadow-1',
    'bg-white',
    'rounded-lg border border-BORDER',
    {
      'absolute z-50': !props.inline,
      'p-4': !props.dense,
      'p-2': props.dense,
      '-translate-y-full': props.top,
    },
  ];
});
</script>
