<template>
  <Modal
    v-for="(modal, index) in modals"
    :key="index"
    v-model="modal.openModal"
    v-bind="modal.options.modal"
    @closed="closeModal(modal, index, 1)"
  >
    <component
      @closeYartuModal="closeModal(modal, index, 2)"
      v-bind="modal.options.component"
      v-on="modal.options.emits"
      :key="`component-${index}`"
      :is="modal.dynamicComponent"
    >
    </component>
  </Modal>
</template>

<script setup>
import { useEventBus } from '@vueuse/core';
import { shallowRef, ref, onMounted } from 'vue';
import { Modal } from '../Modal';

const modals = ref([]);
const bus = useEventBus('yartuModal');

const listener = (type, { instance, options, callBack }) => {
  if (type === 'open') {
    const modal = {
      options,
      dynamicComponent: shallowRef(instance),
      openModal: true,
      callBack,
    };
    modals.value.push(modal);
  } else if (type === 'clear') {
    modals.value.forEach((modal) => {
      modal.openModal = false;
    });
  }
};

const closeModal = (modal, index, x) => {
  modal.openModal = false;
  modals.value.splice(index, 1);
  if (modal.callBack) {
    modal.callBack(modal);
  }
};

onMounted(() => {
  const unsubscribe = bus.on(listener);
});
</script>
