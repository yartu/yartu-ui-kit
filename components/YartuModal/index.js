import YartuModal from "./YartuModal.vue";
import { useYartuModal, yartuModalservice, modals } from './service.js';

const _YartuModal = {
  install(Vue) {
    Vue.use(yartuModalservice);
    Vue.component('yartu-modal', YartuModal);
  }
};

export default _YartuModal;
export { YartuModal, useYartuModal, modals };
