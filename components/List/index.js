import List from "./List.vue";

const _List = {
  install(Vue) {
    Vue.component(List.name, List);
  }
};

export default _List;

export { List };