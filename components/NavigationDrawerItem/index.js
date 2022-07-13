import NavigationDrawerItem from "./NavigationDrawerItem.vue";

const _NavigationDrawerItem = {
  install(Vue) {
    Vue.component(NavigationDrawerItem.name, NavigationDrawerItem);
  }
};

export default _NavigationDrawerItem;

export { NavigationDrawerItem };