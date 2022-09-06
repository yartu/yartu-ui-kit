<template>
  <div :class="containerClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'y-card',
  computed: {
    containerClass() {
      return [
        'flex flex-col',
        'border border-BORDER rounded-lg',
        'hover:border-BLUE cursor-pointer',
        'transition-all duration-300',
        'hover:shadow-1',
      ];
    },
  },
};
</script>

<style></style>
