import ShapedCard from "./ShapedCard.vue";

const _ShapedCard = {
  install(Vue) {
    Vue.component(ShapedCard.name, ShapedCard);
  }
};

export default _ShapedCard;

export { ShapedCard };