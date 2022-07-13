import Tooltip from "./Tooltip.vue";

const _Tooltip = {
  install(Vue) {
    Vue.component(Tooltip.name, Tooltip);
  }
};

export default _Tooltip;

export { Tooltip };