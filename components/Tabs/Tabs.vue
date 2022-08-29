<template>
  <div class="w-full">
    <nav :class="[tabsClass, stickyPosition]">
      <slot name="prefix"></slot>
      <button
        v-for="tab in tabTitles"
        :key="tab"
        :class="[
          tabClass,
          {
            'text-GREY-1 bg-white': selectedTab !== tab,
            'text-BLUE border-b-2 border-BLUE': selectedTab === tab,
          },
        ]"
        @click="selectedTab = tab"
      >
        {{ tab }}
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
const tabTitles = ref(slots.default().map((tab) => tab.props?.title));
const selectedTab = ref(tabTitles.value[0]);

const props = defineProps({
  sticky: {
    type: Boolean,
    default: false,
  },
  stickyPosition: {
    type: String,
    default: 'top-0',
  },
});

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
