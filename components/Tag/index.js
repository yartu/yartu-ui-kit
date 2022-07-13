import Tag from "./Tag.vue";

const _Tag = {
  install(Vue) {
    Vue.component(Tag.name, Tag);
  }
};

export default _Tag;

export { Tag };