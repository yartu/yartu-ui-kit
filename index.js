import './assets/css/tailwind-input.css';
import * as allComponents from './components';

import { setOptions, setVueInstance } from './utils/config';
import { useYartuNotify, yartuNotify } from './components/YartuNotify/service';
import { useYartuModal } from './components/YartuModal/service';

export default {
  install: (Vue, options = {}) => {
    setVueInstance(Vue);
    setOptions(options);

    const optionsComponents = options.components || allComponents;

    for (let componentKey in optionsComponents) {
      if (optionsComponents[componentKey]) {
        Vue.use(allComponents[componentKey]);
      }
    }
  },
};

// export default YartuUiKit;
export * from './components';
export { useYartuNotify, useYartuModal, yartuNotify };
