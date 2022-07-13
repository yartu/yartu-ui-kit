import Icon from "./Icon.vue";

const _Icon = {
  install(Vue) {
    Vue.component(Icon.name, Icon);
  }
};

export default _Icon;

export { Icon };