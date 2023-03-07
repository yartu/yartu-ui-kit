import Mention from "./Mention.vue";

const _Mention = {
  install(Vue) {
    Vue.component(Mention.name, Mention);
  }
};

export default _Mention;

export { Mention };
