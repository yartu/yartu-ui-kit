<template>
  <div :class="pickerClass">
    <div>
      <div class="flex justify-between items-center">
        <button @click="stepBack" :class="changeButtonClass">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="#9AA1B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          @click="zoomOut"
          class="font-extrabold text-BLACK-2 text-xs"
        >
          {{ headerTitle }}
        </button>
        <button @click="stepForward" :class="changeButtonClass">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="#9AA1B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="w-full -ms-2 mt-4">
        <div
          v-if="view === 'month'"
          class="yartu-date-picker-table-calc-width flex flex-wrap gap-2 max-w-54 justify-between"
        >
          <button
            v-for="(month, index) in months"
            :key="month"
            @click="changeMonth(null, index)"
            class="truncate caption w-11 h-11 rounded-md hover:bg-LIGHTBLUE-6 text-BLACK-2 font-semibold"
            :class="{
              'text-white bg-BLUE hover:!bg-BLUE': active.month === index,
            }"
          >
            {{ month.substring(0, 3) }}
          </button>
        </div>
        <div
          v-else-if="view === 'year'"
          class="yartu-date-picker-table-calc-width flex flex-wrap gap-2 max-w-54 justify-between"
        >
          <button
            v-for="year in yearList"
            :key="year"
            @click="changeYear(null, year)"
            class="truncate caption w-11 h-11 rounded-md hover:bg-LIGHTBLUE-6 text-BLACK-2 font-semibold"
            :class="{
              'text-white bg-BLUE hover:!bg-BLUE': active.year === year,
            }"
          >
            {{ year }}
          </button>
        </div>
        <table summary="datetime picker" v-else class="yartu-date-picker-table-calc-width">
          <thead>
            <tr>
              <th :class="thClass" v-for="day in weekDaysList" :key="day[0]">
                {{ day[0] }}
              </th>
            </tr>
          </thead>
          <tbody v-if="daysList">
            <tr v-for="week in 6" :key="week">
              <td v-for="weekDay in 7" class="p-0" :key="weekDay">
                <button
                  @click="chooseDate(daysList[7 * (week - 1) + (weekDay - 1)])"
                  :class="[
                    {
                      'bg-BLUE !text-white hover:!bg-BLUE':
                        daysList[7 * (week - 1) + (weekDay - 1)].isSame(
                          selectedDate,
                        ),
                      'text-GREY-1':
                        !daysList[7 * (week - 1) + (weekDay - 1)].active,
                      'after:absolute after:w-1 after:h-1 after:rounded-full after:bottom-0.5 after:start-1/2 after:-translate-x-1/2 after:bg-BLUE':
                        daysList[7 * (week - 1) + (weekDay - 1)].isToday,
                      '!text-GREY-1 cursor-not-allowed':
                        daysList[7 * (week - 1) + (weekDay - 1)].disabled,
                    },
                    buttonClass,
                  ]"
                >
                  <span>
                    {{ daysList[7 * (week - 1) + (weekDay - 1)].$D }}
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-calendar',
};
</script>

<script setup>
import { ref, watch, computed } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits([
  'update',
  'update:modelValue',
  'monthChange',
  'close',
]);

const props = defineProps({
  modelValue: {
    type: [Object, String, null],
    required: false,
  },
  dense: {
    type: Boolean,
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
  eventDate: {
    type: Array,
    required: false,
    default: () => [],
  },
  time24h: {
    type: Boolean,
    default: () => false,
  },
  min: {
    type: [Date, Object],
    required: false,
  },
  max: {
    type: [Date, Object],
    required: false,
  },
});

const months = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

const now =
  props.modelValue && !isNaN(props.modelValue.$D)
    ? dayjs(props.modelValue, props.formatDate)
    : dayjs();

const selectedDate = ref(props.modelValue ? props.modelValue : now);

const active = ref({
  dayjs: null,
  year: 0,
  month: 0,
  date: 0,
});

const view = ref('day');
const yearPageStart = ref(0);

const yearList = computed(() =>
  Array.from(Array(12), (v, i) => yearPageStart.value + i),
);

const headerTitle = computed(() => {
  if (view.value === 'month') {
    return `${active.value.year}`;
  }
  if (view.value === 'year') {
    return `${yearPageStart.value} - ${yearPageStart.value + 11}`;
  }
  return `${active.value.dayjs.format('MMMM')} ${active.value.year}`;
});

const zoomOut = () => {
  if (view.value === 'day') {
    view.value = 'month';
  } else if (view.value === 'month') {
    yearPageStart.value = active.value.year - 5;
    view.value = 'year';
  } else {
    view.value = 'day';
  }
};

const initDateTime = (date) => {
  active.value = {
    dayjs: date,
    year: date.year(),
    month: date.month(),
    date: date.date(),
  };
};

const isDisabled = (day) => {
  if (props.max) {
    return day.isAfter(props.max);
  }

  if (props.min) {
    return day.isBefore(props.min);
  }

  return false;
};

const weekDaysList = computed(() => {
  return Array.from(Array(7), (v, i) => {
    return dayjs()
      .day(i + props.firstDay)
      .format('ddd');
  });
});

const daysList = computed(() => {
  let display = [];
  const previous = active.value.dayjs.date(0);
  const current = active.value.dayjs.date(0);
  for (let i = 0; i <= current.day() - props.firstDay; i++) {
    const day = previous.subtract(i, 'day');
    day.active = false;
    day.disabled = isDisabled(day);
    display.push(day);
  }
  display = display.sort((a, b) => a.$d - b.$d);

  const today = dayjs();
  const days = Array.from(Array(active.value.dayjs.daysInMonth()), (v, i) => {
    const day = active.value.dayjs.date(++i);
    day.isToday = day.isSame(today, 'day');
    day.active = true;
    day.disabled = isDisabled(day);
    return day;
  });

  display = display.concat(days);
  const leftDays = 42 - display.length;

  for (let i = 1; i <= leftDays; i++) {
    const day = active.value.dayjs.date(i).add(1, 'month');
    day.active = false;
    day.disabled = isDisabled(day);
    display.push(day);
  }

  return display;
});

const applyActive = (newDayjs) => {
  active.value = {
    dayjs: newDayjs,
    year: newDayjs.year(),
    month: newDayjs.month(),
    date: newDayjs.date(),
  };
  emit('monthChange', newDayjs);
};

const changeMonth = (inc, month = null) => {
  const newDayjs = month !== null
    ? active.value.dayjs.month(month)
    : active.value.dayjs.add(inc, 'month');

  applyActive(newDayjs);
  view.value = 'day';
};

const changeYear = (inc, year = null) => {
  const newDayjs = year !== null
    ? active.value.dayjs.year(year)
    : active.value.dayjs.add(inc, 'year');

  applyActive(newDayjs);
  view.value = year !== null ? 'month' : view.value;
};

const stepBy = (inc) => {
  if (view.value === 'month') {
    changeYear(inc);
  } else if (view.value === 'year') {
    yearPageStart.value += inc * 12;
  } else {
    changeMonth(inc);
  }
};

const stepBack = () => stepBy(-1);
const stepForward = () => stepBy(1);

const emitSelected = () => {
  selectedDate.value = selectedDate.value.startOf('day');
  emit('update:modelValue', selectedDate.value);
  emit('update', selectedDate.value);
};

const chooseDate = (date) => {
  if (!date.disabled) {
    selectedDate.value = selectedDate.value
      .set('date', date.date())
      .set('year', date.year())
      .set('month', date.month());
    emitSelected();
    emit('close');
  }
};

// Created
initDateTime(now);

const changeButtonClass = computed(() => {
  return [
    'flex items-center justify-center',
    'hover:bg-GREY-3 ',
    'rounded-full',
    { 'w-10 h-10 text-sm': !props.dense, 'w-7 h-7 text-xs': props.dense },
  ];
});

const thClass = computed(() => {
  return ['font-semibold capitalize text-BLACK-2 text-xs text-center'];
});

const buttonClass = computed(() => {
  return [
    'p-0 relative text-BLACK-2  text-center hover:bg-GREY-3 rounded-full',
    { 'w-10 h-10 text-sm': !props.dense, 'w-7 h-7 text-xs': props.dense },
  ];
});

const pickerClass = computed(() => {
  return [
    'flex flex-col justify-center items-center',
    'mt-1',
    'relative',
    {
      'px-8 pb-4 pt-2': !props.dense,
      'p-3': props.dense,
    },
  ];
});

watch(
  () => props.modelValue,
  (val) => {
    const newDayjs = val ? dayjs(val, props.formatDate) : dayjs();
    initDateTime(newDayjs);
    selectedDate.value = newDayjs;
  },
  { deep: true },
);

watch(
  () => props.time,
  () => {
    selectedDate.value = selectedDate.value.startOf('day');
  },
  { deep: true },
);
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
