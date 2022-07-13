import Card from "./Card.vue";

const _Card = {
  install(Vue) {
    Vue.component(Card.name, Card);
  }
};

export default _Card;

export { Card };