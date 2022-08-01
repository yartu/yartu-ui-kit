import ColorPicker from "./ColorPicker.vue";

const _ColorPicker = {
  install(Vue) {
    Vue.component(ColorPicker.name, ColorPicker);
  }
};

export default _ColorPicker;

export { ColorPicker };