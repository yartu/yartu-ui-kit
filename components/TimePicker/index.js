import TimePicker from './TimePicker.vue';

const _TimePicker = {
  install(Vue) {
    Vue.component(TimePicker.name, TimePicker);
  },
};

export default _TimePicker;

export { TimePicker };
