import './assets/css/tailwind-input.css';
import * as allComponents from './components';

import { setOptions, setVueInstance } from './utils/config';
import { useYartuNotify, yartuNotify } from './components/YartuNotify/service';
import { useYartuModal, activeModals } from './components/YartuModal/service';
import { changeLocale, setLocaleMessage } from './locales';

export default {
  install: (Vue, options = {}) => {
    setVueInstance(Vue);
    setOptions(options);
    setLocaleMessage(options);

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
export { useYartuNotify, useYartuModal, yartuNotify, activeModals, changeLocale };
