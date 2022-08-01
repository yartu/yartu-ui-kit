import Select from "./Select.vue";

const _Select = {
  install(Vue) {
    Vue.component(Select.name, Select);
  }
};

export default _Select;

export { Select };