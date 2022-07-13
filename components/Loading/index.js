import Loading from "./Loading.vue";

const _Loading = {
  install(Vue) {
    Vue.component(Loading.name, Loading);
  }
};

export default _Loading;

export { Loading };