import BottomSheet from "./BottomSheet.vue";

const _BottomSheet = {
  install(Vue) {
    Vue.component(BottomSheet.name, BottomSheet);
  }
};

export default _BottomSheet;

export { BottomSheet };