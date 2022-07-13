import Pagination from "./Pagination.vue";

const _Pagination = {
  install(Vue) {
    Vue.component(Pagination.name, Pagination);
  }
};

export default _Pagination;

export { Pagination };