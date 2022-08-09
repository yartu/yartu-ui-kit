import ListBox from "./ListBox.vue";

const _ListBox = {
  install(Vue) {
    Vue.component(ListBox.name, ListBox);
  }
};

export default _ListBox;

export { ListBox };