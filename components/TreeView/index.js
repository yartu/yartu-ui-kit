import TreeView from "./TreeView.vue";

const _TreeView = {
  install(Vue) {
    Vue.component(TreeView.name, TreeView);
  }
};

export default _TreeView;

export { TreeView };