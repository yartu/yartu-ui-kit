import Base from "./Base.vue";

const _Base = {
  install(Vue) {
    Vue.component(Base.name, Base);
  }
};

export default _Base;

export { Base };