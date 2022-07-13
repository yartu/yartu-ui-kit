import Accordion from "./Accordion.vue";

const _Accordion = {
  install(Vue) {
    Vue.component(Accordion.name, Accordion);
  }
};

export default _Accordion;

export { Accordion };