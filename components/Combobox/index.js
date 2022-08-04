import Combobox from "./Combobox.vue";

const _Combobox = {
  install(Vue) {
    Vue.component(Combobox.name, Combobox);
  }
};

export default _Combobox;

export { Combobox };