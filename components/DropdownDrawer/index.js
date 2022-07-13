import DropdownDrawer from "./DropdownDrawer.vue";

const _DropdownDrawer = {
  install(Vue) {
    Vue.component(DropdownDrawer.name, DropdownDrawer);
  }
};

export default _DropdownDrawer;

export { DropdownDrawer };