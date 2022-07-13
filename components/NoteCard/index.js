import NoteCard from "./NoteCard.vue";

const _NoteCard = {
  install(Vue) {
    Vue.component(NoteCard.name, NoteCard);
  }
};

export default _NoteCard;

export { NoteCard };