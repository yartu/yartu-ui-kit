import Chip from "./Chip.vue";

const _Chip = {
  install(Vue) {
    Vue.component(Chip.name, Chip);
  }
};

export default _Chip;

export { Chip };