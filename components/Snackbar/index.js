import Snackbar from "./Snackbar.vue";

const _Snackbar = {
  install(Vue) {
    Vue.component(Snackbar.name, Snackbar);
  }
};

export default _Snackbar;

export { Snackbar };