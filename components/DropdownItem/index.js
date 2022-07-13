import DropdownItem from "./DropdownItem.vue";

const _DropdownItem = {
  install(Vue) {
    Vue.component(DropdownItem.name, DropdownItem);
  }
};

export default _DropdownItem;

export { DropdownItem };