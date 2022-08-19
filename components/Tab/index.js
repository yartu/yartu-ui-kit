import Tab from "./Tab.vue";

const _Tab = {
  install(Vue) {
    Vue.component(Tab.name, Tab);
  }
};

export default _Tab;

export { Tab };