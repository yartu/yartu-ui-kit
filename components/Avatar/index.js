import Avatar from "./Avatar.vue";

const _Avatar = {
  install(Vue) {
    Vue.component(Avatar.name, Avatar);
  }
};

export default _Avatar;

export { Avatar };