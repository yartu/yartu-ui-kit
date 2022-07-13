import Button from "./Button.vue";

const _Button = {
  install(Vue) {
    Vue.component(Button.name, Button);
  }
};

export default _Button;

export { Button };