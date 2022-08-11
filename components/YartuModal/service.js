import { useEventBus } from '@vueuse/core';
import { inject } from 'vue';

const YartuModalSymbol = Symbol();
const bus = useEventBus('yartuModal');

const busFunctions = {
  open: (instance, options = {}, callBack = null) => {
    bus.emit('open', { instance, options, callBack });
  },
  clear: () => {
    bus.emit('clear');
  }
};

export function useYartuModal() {
    const yartuModal = inject(YartuModalSymbol);
    if (!yartuModal) {
      throw new Error('No Yartu Modal provided!');
    }
    return yartuModal;
}

export const yartuModalservice = {
  install: (app) => {
    app.config.globalProperties.$yartuModal = busFunctions;
    if (typeof window !== 'undefined') {
      window.$yartuModal = busFunctions;
    }
    app.provide(YartuModalSymbol, busFunctions);
  },
};
