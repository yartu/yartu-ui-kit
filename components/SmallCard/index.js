import SmallCard from "./SmallCard.vue";

const _SmallCard = {
  install(Vue) {
    Vue.component(SmallCard.name, SmallCard);
  }
};

export default _SmallCard;

export { SmallCard };