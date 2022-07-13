import Modal from "./Modal.vue";

const _Modal = {
  install(Vue) {
    Vue.component(Modal.name, Modal);
  }
};

export default _Modal;

export { Modal };