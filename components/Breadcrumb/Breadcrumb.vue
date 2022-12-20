<template>
  <nav :class="containerClass">
    <ol :class="itemClass">
      <li v-for="(crumb, index) in crumbs" :key="index">
        <button
          type="button"
          class="font-extrabold"
          @click="selected(crumb, index)"
        >
          {{ crumb }}
        </button>
        <span
          v-if="!isLast(index)"
          :class="isSecondLast(index) ? 'text-BLACK-2' : ''"
        >
          &#47;
        </span>
      </li>
      <li></li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'y-breadcrumb',
};
</script>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['selected-path']);
const props = defineProps({
  crumbs: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
  },
});

const isLast = (index) => {
  return index === props.crumbs.length - 1;
};
const isSecondLast = (index) => {
  return index === props.crumbs.length - 2;
};
const selected = (crumb, index) => {
  emit('selected-path', { crumb, index });
};

const containerClass = computed(() => [
  'w-full',
  'font-extrabold',
  {
    'text-xl': props.size === 'xl',
    'text-lg': props.size === 'lg',
    'text-base': props.size === 'md',
    'text-sm': props.size === 'sm',
    'text-xs': props.size === 'xs',
  },
]);

const itemClass = computed(() => [
  'flex',
  'gap-1',
  'text-GREY-1',
  'bread-crumb-items',
]);
</script>

<style>
.bread-crumb-items > li:last-child,
.bread-crumb-items > li:nth-last-child(2) {
  color: #394c66ff;
}
</style>
