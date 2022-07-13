import AppContainer from "./AppContainer.vue";

const _AppContainer = {
  install(Vue) {
    Vue.component(AppContainer.name, AppContainer);
  }
};

export default _AppContainer;

export { AppContainer };