import Badge from "./Badge.vue";

const _Badge = {
  install(Vue) {
    Vue.component(Badge.name, Badge);
  }
};

export default _Badge;

export { Badge };