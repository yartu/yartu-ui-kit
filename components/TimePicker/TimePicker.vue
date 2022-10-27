<template>
  <div class="relative">
    <div :class="inputContainerClass">
      <label :id="label" class="text-sm font-semibold" v-if="label">
        {{ label }} 
      </label>
      <label
        ref="target"
        v-if="!inline"
        class="flex flex-1 items-center px-4 py-2 border border-BORDER rounded-lg"
        :class="{ '!border-BLUE': showPicker }"
        :id="label"
      >
        <input
          type="text"
          class="outline-none subtitle-5 text-BLACK-2 flex-2 w-[4.375rem]"
          aria-autocomplete="none"
          aria-haspopup="dialog"
          aria-expanded="true"
          inputmode="none"
          tabindex="0"
          :value="selectedTime ? selectedTime.format(format) : ''"
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
              d="M12 3.81818C7.48131 3.81818 3.81818 7.48131 3.81818 12C3.81818 16.5187 7.48131 20.1818 12 20.1818C16.5187 20.1818 20.1818 16.5187 20.1818 12C20.1818 7.48131 16.5187 3.81818 12 3.81818ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
              fill="#9AA1B4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.9655 7C12.4988 7 12.931 7.42495 12.931 7.94915V11.6238L14.7172 13.3797C15.0943 13.7504 15.0943 14.3513 14.7172 14.722C14.3401 15.0927 13.7288 15.0927 13.3518 14.722L11.2828 12.6881C11.1017 12.5101 11 12.2687 11 12.0169V7.94915C11 7.42495 11.4323 7 11.9655 7Z"
              fill="#9AA1B4"
            />
          </svg>
        </button>
      </label>
    </div>
    <transition name="fade">
      <teleport :disabled="inline" to="body">
        <div
          ref="pickerContainer"
          v-show="showPicker || inline"
          :class="timePickerClass"
        >
          <div class="inline-flex flex-col gap-3 items-center">
            <div
              v-if="!time24h"
              class="rounded-lg border border-BORDER inline-flex flex-wrap h-8"
            >
              <label :class="time12HContainer">
                <input
                  @change="emitSelected"
                  v-model="timeData.t"
                  type="radio"
                  value="am"
                  class="appearance-none checked:bg-BLUE absolute inset-0 rounded-l-md am-selector"
                />
                <p class="body-1 relative z-1 uppercase text-BLACK-2">am</p>
              </label>
              <div class="h-full w-px bg-BORDER"></div>
              <label :class="time12HContainer">
                <input
                  @change="emitSelected"
                  v-model="timeData.t"
                  type="radio"
                  value="pm"
                  class="appearance-none checked:bg-BLUE absolute inset-0 rounded-r-md pm-selector w-16"
                />
                <p class="body-1 relative z-1 uppercase text-BLACK-2">pm</p>
              </label>
            </div>
            <div class="inline-flex flex-wrap gap-3">
              <div :class="minuteBtnContainer">
                <button
                  type="button"
                  @click="
                    timeData.h = index.toString();
                    emitSelected();
                  "
                  v-for="(item, index) in 24"
                  :key="item"
                  :class="[
                    timeData.h == index
                      ? 'bg-BLUE text-white'
                      : 'text-BLACK-2 hover:bg-LIGHTBLUE-6',
                    minuteBtnClass,
                  ]"
                  :data-hour-value="timeData.h"
                >
                  {{ index >= 10 ? index : `0${index}` }}
                </button>
              </div>
              <div
                class="bg-BORDER w-px"
                :class="{
                  'h-44': !props.inline,
                  'h-52': props.inline,
                }"
              ></div>
              <div :class="minuteBtnContainer">
                <button
                  type="button"
                  @click="
                    timeData.m = index.toString();
                    emitSelected();
                  "
                  v-for="(item, index) in 60"
                  :key="item"
                  :class="[
                    timeData.m == index
                      ? 'bg-BLUE text-white'
                      : 'text-BLACK-2 hover:bg-LIGHTBLUE-6',
                    minuteBtnClass,
                  ]"
                  :data-minute-value="timeData.m"
                >
                  {{ index >= 10 ? index : `0${index}` }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </teleport>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'y-time-picker',
};
</script>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import dayjs from 'dayjs';
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['update', 'update:modelValue', 'close']);
const props = defineProps({
  modelValue: {
    type: [Object, Date, String],
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
  outline: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  formatTime: {
    type: String,
    required: false,
    default: 'HH.mm',
  },
  inline: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  time24h: {
    type: Boolean,
    default: () => true,
  },
});

const target = ref(null);
const pickerContainer = ref(null);
const showPicker = ref(false);
const minuteButtons = ref(null);
const hourButtons = ref(null);
const format = ref(props.formatTime ? props.formatTime : 'HH.mm');

const now = props.modelValue
  ? dayjs(props.modelValue, props.formatTime)
  : dayjs();

const selectedTime = ref(props.modelValue ? props.modelValue : now);

const timeData = ref({
  h: '00',
  m: '00',
  t: 'am',
});

onClickOutside(
  target,
  () => {
    showPicker.value = false;
  },
  { ignore: [pickerContainer] },
);

const open = async () => {
  showPicker.value = true;
  calculatePosition();
  await nextTick();
  scrollToTime();
};

const scrollToTime = () => {
  const time = {
    h: 0,
    m: 0,
  };

  time.h = parseInt(timeData.value.h.replace(/^0{1,1}/, ''), 10);
  time.m = parseInt(timeData.value.m.replace(/^0{1,1}/, ''), 10);
  hourButtons.value[time.h].scrollIntoView({ behavior: 'auto' });
  minuteButtons.value[time.m].scrollIntoView({ behavior: 'smooth' });
};

const clear = () => {
  emit('update', '');
  emit('update:modelValue', '');
  showPicker.value = false;
  selectedTime.value = '';
};

const calculatePosition = () => {
  let container = target.value.getBoundingClientRect();
  let pickerContainerStyle = pickerContainer.value.style;
  pickerContainerStyle.top = container.bottom + 16 + 'px';
  pickerContainerStyle.left = container.left + 'px';
};

onMounted(() => {
  minuteButtons.value = document.querySelectorAll('[data-minute-value]');
  hourButtons.value = document.querySelectorAll('[data-hour-value]');
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculatePosition);
});

const initTime = (date) => {
  let hour = date.hour();
  const minute = date.minute();
  const timeType = date.format('a');
  
  if (!props.time24h && hour > 12) {
    hour -= 12;
  } else if (props.time24h && timeType === 'pm' && hour < 12) {
    hour += 12;
  }

  timeData.value = {
    h: hour.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    m: minute.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    t: date.format('a'),
  };
};

const emitSelected = () => {
  let hour = parseInt(timeData.value.h) || 0;
  const minute = parseInt(timeData.value.m) || 0;
  if (!props.time24h && timeData.value.t === 'pm' && hour > 0) {
    hour += 12;
  }

  selectedTime.value = selectedTime.value
    .set('hour', hour)
    .set('minute', minute);

  emit('update:modelValue', selectedTime.value);
  emit('update', selectedTime.value);
};

const chooseTime = (time) => {
  if (!time.disabled) {
    selectedTime.value = time;
    emitSelected();
    emit('close');
  }
};

// Created
initTime(now);

const inputContainerClass = computed(() => {
  return ['text-BLACK-2', 'flex flex-col gap-2'];
});

const time12HContainer = computed(() => {
  return ['relative w-11 h-full px-3 py-1.5 flex items-center cursor-pointer'];
});

const minuteBtnClass = computed(() => {
  return ['snap-start w-8 h-8 rounded-lg text-center py-2 text-xs'];
});

const minuteBtnContainer = computed(() => {
  return [
    'snap-y snap-proximity overflow-y-auto scrollbar-hide flex flex-col gap-1',
    {
      'h-44': !props.inline,
      'h-52': props.inline,
    },
  ];
});

const timePickerClass = computed(() => {
  return [
    'inline-block',
    'bg-white',
    {
      'p-4': !props.dense,
      'p-2': props.dense,
      'fixed z-50 shadow-1': !props.inline,
      relative: props.inline,
      'rounded-lg border border-BORDER': props.outline,
    },
  ];
});

watch(
  () => props.modelValue,
  (val) => {
    const newDayjs = val ? dayjs(val, props.formatTime) : dayjs();
    initTime(newDayjs);
    selectedTime.value = newDayjs;
  },
  { deep: true },
);

watch(
  () => props.time,
  (val) => {
    selectedTime.value = selectedTime.value.startOf('day');
  },
  { deep: true },
);

defineExpose({
  scrollToTime,
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

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
