import ProgressBar from "./ProgressBar.vue";

const _ProgressBar = {
  install(Vue) {
    Vue.component(ProgressBar.name, ProgressBar);
  }
};

export default _ProgressBar;

export { ProgressBar };