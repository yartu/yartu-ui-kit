<template>
  <div class="w-full">
    <nav :class="[tabsClass, stickyPosition]">
      <slot name="prefix"></slot>
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          tabClass,
          {
            'text-GREY-1 bg-white': selectedTab?.title !== tab?.title,
            'text-BLUE border-b-2 border-BLUE':
              selectedTab?.title === tab?.title,
          },
        ]"
        @click="changeTab(tab, index)"
      >
        {{ tab.title }}
      </button>
      <slot name="postfix"></slot>
    </nav>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-tabs',
};
</script>

<script setup>
import { provide, useSlots, ref, computed } from 'vue';

const slots = useSlots();
const tabs = ref(
  slots.default().map((t) => {
    return { value: t.props?.value, title: t.props?.title };
  }),
);
const tabTitles = ref(slots.default().map((tab) => tab.props?.title));

const selectedTab = computed({
  get: () => {
    if (typeof props.modelValue === 'string') {
      return tabs.value.find((t) => t.value === props.modelValue);
    }
    return tabs.value[props.modelValue];
  },
  set: (val) => val,
});

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  sticky: {
    type: Boolean,
    default: false,
  },
  stickyPosition: {
    type: String,
    default: 'top-0',
  },
  modelValue: null,
});

const changeTab = (tab, index) => {
  selectedTab.value = tab;
  const value = tab.value || index;
  emit('update:modelValue', value);
};

const tabsClass = computed(() => {
  return [
    'relative',
    'bg-white',
    'flex flex-col sm:flex-row',
    'border-b border-BORDER',
    {
      'sticky z-1': props.sticky,
    },
  ];
});

const tabClass = computed(() => {
  return [
    'py-3 px-6',
    'hover:text-BLUE focus:outline-none',
    'font-semibold text-sm',
  ];
});

provide('selectedTab', selectedTab);
</script>
