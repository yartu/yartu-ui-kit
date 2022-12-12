<template>
  <i
    :class="name"
    aria-hidden="true"
    :style="iconColor !== 'none' ? `color: ${iconColor}` : ''"
  ></i>
</template>

<script>
export default {
  name: 'y-icon',
};
</script>

<script setup>
defineProps({
  name: {
    type: [String, Array],
    default: null,
  },
  iconColor: {
    type: String,
    default: 'none',
  },
});
</script>
