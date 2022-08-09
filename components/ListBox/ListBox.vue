<template>
  <div class="bg-white border border-BORDER">
    <div
      tabindex="0"
      :key="index"
      type="button"
      @click="choose(item)"
      v-for="(item, index) in props.options"
      class="block text-BLACK-02 text-sm w-full border-b border-BORDER p-4 hover:bg-GREY-3 last:border-0 cursor-pointer"
    >
      <slot name="template" :item="item">
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'y-listbox',
};
</script>

<script setup>
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  options: null,
});

function choose(item) {
  emit('update:modelValue', item);
}
</script>

<style></style>
