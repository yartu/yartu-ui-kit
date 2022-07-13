import Input from "./Input.vue";

const _Input = {
  install(Vue) {
    Vue.component(Input.name, Input);
  }
};

export default _Input;

export { Input };