<template>
  <Modal
    v-model="openModal"
    v-bind="comOptions.modal"
    @closed="closeModal"
  > 
    <component
      @closeYartuModal="closeModal"
      v-bind="comOptions.component"
      v-on="comOptions.emits"
      :is="dynamicComponent"
    >
    </component>
  </Modal>
</template>

<script setup>
import { useEventBus } from '@vueuse/core';
import { markRaw, ref, onMounted } from 'vue';
import { Modal } from '../Modal'

let dynamicComponent = ref(null);
const comOptions = ref({});
const openModal = ref(false);
const bus = useEventBus('yartuModal');

const listener = (type, { instance, options, callBack }) => {
  if (type === 'open') {
    comOptions.value = options;
    dynamicComponent.value = markRaw(instance);

    if (callBack) {
      comOptions.value.callBack = callBack;
    }

    openModal.value = true;
  } else if (type === 'clear') {
    openModal.value = false;
  }
};

const closeModal = () => {
  openModal.value = false;
  if (comOptions.value.callBack) {
    comOptions.value.callBack();
  }
}

onMounted(() => {
  const unsubscribe = bus.on(listener);
});

</script>
