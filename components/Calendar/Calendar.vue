 <template>
  <div class="flex flex-col justify-center items-center my-2">
    <div class="p-3">
      <div v-if="date">
        <div class="flex justify-between items-center">
          <button @click="changeMonth(-1)" class="hover:bg-BLACKOVERLAY rounded-full w-7 h-7">&lt;</button>
          <y-dropdown :classes="'max-h-56 overflow-auto'">
              <y-dropdown-item
                v-for="(month, index) in months"
                :key="month"
                @click="changeMonth(null, index)"
                class="truncate"
              >
                <div class="flex">
                  <h1
                    class="caption"
                    :class="{ 'text-BLUE': active.month === index }"
                  >
                    {{ month }}
                  </h1>
                </div>
              </y-dropdown-item>
              <template #activator="{ open }">
                <button @click="open" class="font-extrabold text-BLACK-2 text-xs">{{ active.dayjs.format('MMMM') }} {{ active.year }}</button>
              </template>
            </y-dropdown>
          <button @click="changeMonth(1)" class="hover:bg-BLACKOVERLAY rounded-full w-7 h-7">&gt;</button>
        </div>
        <div class="w-full -ml-2 mt-4">
          <table class="yartu-date-picker-table-calc-width">
            <thead>
              <tr>
                <th
                  :class="thClass"
                  v-for="day in weekDaysList"
                >
                  {{ day[0] }}
                </th>
              </tr>
            </thead>
            <tbody v-if="daysList">
              <tr v-for="week in 6">
                <td v-for="weekDay in 7" class="p-0">
                  <button
                    @click="chooseDate(daysList[7 * (week - 1) + (weekDay - 1)])"
                    :class="[
                      {
                        'bg-BLUE !text-white': daysList[7 * (week - 1) + (weekDay - 1)].isSame(selectedDate),
                        'text-GREY-1': !daysList[7 * (week - 1) + (weekDay - 1)].active,
                        'after:absolute after:w-1 after:h-1 after:rounded-full after:bottom-0.5 after:left-3.5 after:bg-BLUE': daysList[7 * (week - 1) + (weekDay - 1)].isToday,
                      },
                      buttonClass,
                    ]
                    "
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
    <div v-if="time">
      <hr v-if="date" class="border-BORDER mb-4 calc-width-for-date-picker">
      <div class="flex flex-wrap gap-3">
        <div class="inline-flex flex-wrap items-center h-9">
          <input placeholder="00" type="number" maxlength="2" max="23" min="0" class="w-11 h-9 rounded-lg text-center py-2 outline-BLUE border border-BORDER"/>
          <p class="px-1">:</p>
          <input placeholder="00" type="number" maxlength="2" max="59" min="0" class="w-11 h-9 rounded-lg text-center py-2 outline-BLUE border border-BORDER" />
        </div>
        <div class="rounded-lg border border-BORDER inline-flex flex-wrap h-9">
          <label class="relative w-11 h-full px-3 py-2 flex items-center">
            <input type="radio" value="am" class="appearance-none checked:bg-BLUE absolute inset-0 rounded-l-lg am-selector"/>
            <p class="body-1 relative z-1 uppercase">am</p>
          </label>
          <div class="h-full w-px bg-BORDER"></div>
          <label class="relative w-11 h-full px-3 py-2 flex items-center">
            <input type="radio" value="pm" class="appearance-none checked:bg-BLUE absolute inset-0 rounded-r-lg pm-selector"/>
            <p class="body-1 relative z-1 uppercase">pm</p>
          </label>
        </div>
      </div>
    </div>
    <div v-if="!inline" class="flex w-full p-3">
      <y-button @click="emitSelected" primary class="ml-auto">
        Save
      </y-button>
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
import dayjs from "dayjs";

const emit = defineEmits(['update', 'update:modelValue', 'close']);


const props = defineProps({
  modelValue: {
    type: [Object, String],
    required: false,
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
    default: () => false,
  }
})

const now = props.modelValue ? dayjs(props.modelValue, props.formatDate) : dayjs();

const active = ref({
  dayjs: now,
  year: now.year(),
  month: now.month(),
  date: now.date(),
});

const months = ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

const selectedDate = ref(props.modelValue ? props.modelValue : now);

const weekDaysList = computed(() => {
  return Array.from(Array(7), (v, i) => {
    return dayjs().day(i + props.firstDay).format('ddd');
  });
});

const daysList = computed(() => {
  let display = [];
  const previous = active.value.dayjs.date(0);
  const current = active.value.dayjs.date(0);
  for (let i = 0; i <= current.day() - props.firstDay; i++) {
    const day = previous.subtract(i, 'day');
    day.active = false;
    display.push(day);
  }
  display = display.sort((a, b) => a.$d - b.$d)

  const today = dayjs();
  const days = Array.from(
    Array(active.value.dayjs.daysInMonth()),
    (v, i) => {
      const day = active.value.dayjs.date(++i)
      day.isToday = day.isSame(today, 'day');
      day.active = true;
      return day;
    },
  );
  display = display.concat(days);
  const leftDays = 42 - display.length;

  for (let i = 1; i <= leftDays; i++) {
    const day = active.value.dayjs.date(i).add(1, 'month');
    day.active = false;
    display.push(day);
  }
  return display;
});

const changeMonth = (inc, month = null) => {

  let newDayjs = {};
  if (month !== null) {
    newDayjs = active.value.dayjs.month(month);
  } else {
    newDayjs = active.value.dayjs.add(inc, 'month');
  }

  active.value = {
    dayjs: newDayjs,
    year: newDayjs.year(),
    month: newDayjs.month(),
    date: newDayjs.date(),
  }
};

const emitSelected = () => {
  emit('update', selectedDate.value);
  emit('update:modelValue', selectedDate.value);
};

const chooseDate = (date) => {
  selectedDate.value = date;
  emitSelected();
  emit('close');
};


const thClass = computed(() => {
  return ['font-semibold capitalize text-BLACK-2 text-xs text-center'];
});

const buttonClass = computed(() => {
  return [
    'w-7 h-7 p-0 relative text-BLACK-2 text-xs text-center hover:bg-BLACKOVERLAY rounded-full',
  ];
});

const activeClass = computed(() => {
  return ['bg-BLUE !text-white'];
});

watch(
  () => props.modelValue,
  (val) => {
    const newDayjs = dayjs(val, props.formatDate);
    active.value = {
      dayjs: newDayjs,
      year: newDayjs.year(),
      month: newDayjs.month(),
      date: newDayjs.date(),
    }
    selectedDate.value = newDayjs;
  },
  { deep: true }
);

</script>

<style>
.yartu-date-picker-table-calc-width {
  width: calc(100% + 16px);
}

.am-selector:checked + p{
  color: white;
}

.pm-selector:checked + p{
  color: white !important;
}

.calc-width-for-date-picker{
  width: calc(100% - 0.75rem);
}
</style>
