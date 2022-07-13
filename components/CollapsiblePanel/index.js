import CollapsiblePanel from "./CollapsiblePanel.vue";

const _CollapsiblePanel = {
  install(Vue) {
    Vue.component(CollapsiblePanel.name, CollapsiblePanel);
  }
};

export default _CollapsiblePanel;

export { CollapsiblePanel };