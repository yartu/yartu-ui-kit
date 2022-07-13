<template>
  <div :class="containerClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-app-container',
  props: {},
  computed: {
    containerClass() {
      return ['flex', 'relative', 'h-screen'];
    },
  },
};
</script>

<style></style>
