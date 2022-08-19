<template>
  <i :class="iconClass" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'y-icon',
  props: {
    name: {
      type: [String, Array],
      default: null,
    },
  },
  computed: {
    iconClass() {
      return this.name;
    },
  },
};
</script>

<style></style>
