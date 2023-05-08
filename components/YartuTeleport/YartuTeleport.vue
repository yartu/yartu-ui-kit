<template>
  <teleport to="body">
    <div ref="teleportedContent">
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'y-teleport',
};
</script>

<script setup>
defineProps({
  teleportTo: {
    type: String,

    default: 'body,',
  },
});
</script>
<style></style>
