import NavigationTree from './NavigationTree.vue';

const _NavigationTree = {
  install(Vue) {
    Vue.component(NavigationTree.name, NavigationTree);
  },
};

export default _NavigationTree;

export { NavigationTree };
