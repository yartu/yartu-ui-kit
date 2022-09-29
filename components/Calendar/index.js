import Calendar from './Calendar.vue';

const _Calendar = {
  install(Vue) {
    Vue.component(Calendar.name, Calendar);
  },
};

export default _Calendar;

export { Calendar };
