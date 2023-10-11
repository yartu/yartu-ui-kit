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
import { Modal } from '../Modal';
import { modals, closeModal } from './service';

</script>
