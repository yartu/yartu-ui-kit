import Video from "./Video.vue";

const _Video = {
  install(Vue) {
    Vue.component(Video.name, Video);
  }
};

export default _Video;

export { Video };