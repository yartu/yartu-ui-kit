<template>
  <transition name="slide-left">
    <div
      class="relative flex flex-wrap break-words bg-WHITE w-full"
      v-show="title?.toLowerCase() == selectedTab?.title.toLowerCase()"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'y-tab',
};
</script>

<script setup>
import { inject } from 'vue';

const selectedTab = inject('selectedTab');

defineProps({
  title: {
    type: String,
    default: 'Tab',
  },
  value: {
    type: String,
    default: '',
  },
});
</script>
