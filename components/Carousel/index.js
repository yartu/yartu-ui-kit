import Carousel from "./Carousel.vue";

const _Carousel = {
  install(Vue) {
    Vue.component(Carousel.name, Carousel);
  }
};

export default _Carousel;

export { Carousel };