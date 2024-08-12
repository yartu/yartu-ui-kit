<template>
  <div v-if="pages.length > 0" :class="paginationClass">
    <button v-if="clickableInfo" @click="$emit('click-info')" :class="paginationTitleClass" class="!me-0">
      {{ viewRangeStart }}-{{ viewRangeEnd }} of {{ total }}
      <y-icon name="yi yi-arrow-down text-sm ms-1 text-GREY-1"></y-icon>
    </button>
    <div v-else :class="paginationTitleClass">
      {{ viewRangeStart }}-{{ viewRangeEnd }} of {{ total }}
    </div>
    <div v-if="!simple" class="flex gap-1 items-center">
      <div :class="leftArrowClass">
        <button
          :class="paginationItemClass"
          @click.prevent="changePage(current - 1)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="#9AA1B4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.4712 3.52729C10.2109 3.26694 9.78878 3.26694 9.52843 3.52729L5.52843 
              7.52729C5.26808 7.78764 5.26808 8.20975 5.52843 8.4701L9.52843 
              12.4701C9.78878 12.7305 10.2109 12.7305 10.4712 12.4701C10.7316 
              12.2098 10.7316 11.7876 10.4712 11.5273L6.94265 7.9987L10.4712 
              4.4701C10.7316 4.20975 10.7316 3.78764 10.4712 3.52729Z"
            />
          </svg>
        </button>
      </div>
      <button
        v-if="!pages.includes(1)"
        @click.prevent="changePage(1)"
        :class="[
          current === 1 ? 'bg-BLUE text-WHITE border-none hover:bg-BLUE' : '',
          paginationItemClass,
        ]"
      >
        1
      </button>
      <span :class="dotsClass" v-if="hasFirst()">...</span>
      <button
        @click.prevent="changePage(item)"
        v-for="(item, index) in pages"
        :key="index"
        :class="[
          current === item
            ? 'bg-BLUE text-WHITE border-none hover:bg-BLUE'
            : '',
          paginationItemClass,
        ]"
      >
        {{ item }}
      </button>
      <span :class="dotsClass" v-if="hasLast()">...</span>
      <button
        v-if="!pages.includes(totalPages)"
        @click.prevent="changePage(totalPages)"
        :class="[
          current === totalPages
            ? 'bg-BLUE text-WHITE border-none hover:bg-BLUE'
            : '',
          paginationItemClass,
        ]"
      >
        {{ totalPages }}
      </button>
      <div :class="rightArrowClass">
        <button
          :class="paginationItemClass"
          @click.prevent="changePage(current + 1)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.52876 3.52729C5.78911 3.26694 6.21122 3.26694 6.47157 3.52729L10.4716 7.52729C10.7319 7.78764 10.7319 8.20975 10.4716 8.4701L6.47157 12.4701C6.21122 12.7305 5.78911 12.7305 5.52876 12.4701C5.26841 12.2098 5.26841 11.7876 5.52876 11.5273L9.05735 7.9987L5.52876 4.4701C5.26841 4.20975 5.26841 3.78764 5.52876 3.52729Z"
              fill="#9AA1B4"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="flex flex-wrap">
      <y-button circle size="xs" @click.prevent="changePage(current - 1)">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 12L5 8L9 4L9 12Z" fill="#9AA1B4" />
        </svg>
      </y-button>
      <y-button circle size="xs" @click.prevent="changePage(current + 1)">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 12L11 8L7 4L7 12Z" fill="#9AA1B4" />
        </svg>
      </y-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-pagination',
};
</script>
<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['pageChanged', 'click-info']);
const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  clickableInfo: {
    type: Boolean,
    required: false,
    default: false,
  },
  total: {
    type: Number,
    default: 10,
  },
  pageRange: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 20,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  orientation: {
    type: String,
  },
  page: {
    type: Number,
    required: false,
  },
});

const current = ref(props.page);

const hasFirst = () => {
  return rangeStart.value !== 1;
};

const hasLast = () => {
  return rangeEnd.value < totalPages.value;
};

const hasPrev = () => {
  return current.value > 1;
};

const hasNext = () => {
  return current.value < totalPages.value;
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    current.value = page;
    emit('pageChanged', page);
  }
};

const paginationItemClass = computed(() => [
  'border border-BORDER rounded-full',
  'font-semibold text-BLACK-2',
  'inline-flex items-center justify-center',
  'hover:bg-GREY-3',
  'transition-all duration-300',
  {
    'w-9 h-9 text-sm': props.size == 'md',
    'w-7 h-7 text-xs': props.size == 'sm',
    'w-5 h-5 text-xs': props.size == 'xs',
  },
]);

const paginationTitleClass = computed(() => [
  'text-sm',
  'font-semibold',
  'text-BLACK-2',
  'flex items-center my-auto',
  {
    'me-2': props.simple,
    'me-6': !props.simple,
    '!me-0': props.orientation === 'col',
  },
]);

const paginationClass = computed(() => [
  'flex',
  'gap-1',
  'items-center',
  {
    'flex-col !items-end': props.orientation === 'col',
  },
]);

const leftArrowClass = computed(() => [
  {
    'me-4': props.size == 'md',
    'me-2': props.size == 'sm',
    'me-1': props.size == 'xs',
  },
]);
const rightArrowClass = computed(() => [
  {
    'ms-4': props.size == 'md',
    'ms-2': props.size == 'sm',
    'ms-1': props.size == 'xs',
  },
]);

const dotsClass = computed(() => [
  'text-GREY-1',
  {
    'px-3': props.size == 'md',
    'px-2': props.size == 'sm',
    'px-1': props.size == 'xs',
  },
]);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const viewRangeEnd = computed(() => {
  let end = current.value * props.perPage;
  return end < props.total ? end : props.total;
});

const viewRangeStart = computed(() => {
  let start = (current.value - 1) * props.perPage + 1;
  return start > 0 ? start : 1;
});

const rangeStart = computed(() => {
  let start = current.value - props.pageRange;
  return start > 0 ? start : 1;
});

const rangeEnd = computed(() => {
  let end = current.value + props.pageRange;
  return end < totalPages.value ? end : totalPages.value;
});

const pages = computed(() => {
  let pages = [];
  for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
    if (i !== totalPages.value) {
      pages.push(i);
    }
  }
  return pages;
});

watch(
  () => props.page,
  (newVal) => {
    current.value = newVal;
  },
);
</script>
