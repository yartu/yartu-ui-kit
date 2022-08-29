<template>
  <div class="border border-BORDER rounded-full h-9 p-1">
    <input
      v-for="(button, index) in buttons"
      :key="index"
      type="radio"
      class="checked:shadow-1 checked:bg-white"
    />
  </div>
</template>

<script>
export default {
  name: 'y-button-group',
};
</script>

<script setup>
defineProps({
  buttons: {
    type: Number || String,
    default: 4,
  },
});
</script>

<style></style>
