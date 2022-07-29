import './assets/css/tailwind-input.css';
import * as allComponents from './components';

import { setOptions, setVueInstance } from './utils/config';
import { YartuNotifyService } from './components/YartuNotify';

export default {
  install: (Vue, options = {}) => {
    setVueInstance(Vue);
    setOptions(options);

    console.log('YartuNotifyService', YartuNotifyService);

    const optionsComponents = options.components || allComponents;

    for (let componentKey in optionsComponents) {
      if (optionsComponents[componentKey]) {
        Vue.use(allComponents[componentKey]);
      }
    }
  }
}

// export default YartuUiKit;
export * from './components';
