import Breadcrumb from "./Breadcrumb.vue";

const _Breadcrumb = {
  install(Vue) {
    Vue.component(Breadcrumb.name, Breadcrumb);
  }
};

export default _Breadcrumb;

export { Breadcrumb };