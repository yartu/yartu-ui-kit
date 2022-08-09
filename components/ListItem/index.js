import ListItem from "./ListItem.vue";

const _ListItem = {
  install(Vue) {
    Vue.component(ListItem.name, ListItem);
  }
};

export default _ListItem;

export { ListItem };