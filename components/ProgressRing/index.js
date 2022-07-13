import ProgressRing from "./ProgressRing.vue";

const _ProgressRing = {
  install(Vue) {
    Vue.component(ProgressRing.name, ProgressRing);
  }
};

export default _ProgressRing;

export { ProgressRing };