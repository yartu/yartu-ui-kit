import YartuNotify from "./YartuNotify.vue";
import { useYartuNotify, YartuNotifyService, yartuNotify, messages } from './service.js';

const _YartuNotify = {
  install(Vue) {
    Vue.use(YartuNotifyService);
    Vue.component('yartu-notify', YartuNotify);
  }
};

export default _YartuNotify;
export { YartuNotify, useYartuNotify, yartuNotify, YartuNotifyService, messages };
