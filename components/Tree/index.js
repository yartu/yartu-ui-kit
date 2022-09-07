import Tree from './Tree.vue';

const _Tree = {
  install(Vue) {
    Vue.component(Tree.name, Tree);
  },
};

export default _Tree;

export { Tree };
