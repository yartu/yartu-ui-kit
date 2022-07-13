import Toast from "./Toast.vue";

const _Toast = {
  install(Vue) {
    Vue.component(Toast.name, Toast);
  }
};

export default _Toast;

export { Toast };