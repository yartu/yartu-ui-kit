import NavigationDrawer from "./NavigationDrawer.vue";

const _NavigationDrawer = {
  install(Vue) {
    Vue.component(NavigationDrawer.name, NavigationDrawer);
  }
};

export default _NavigationDrawer;

export { NavigationDrawer };