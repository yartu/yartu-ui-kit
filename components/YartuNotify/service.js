import { useEventBus } from '@vueuse/core'
import { inject, ref } from 'vue';

const bus = useEventBus('yartuNotify');

const busFunctions = {
  add: (message) => {
    // EventBus.$emit('add', message);
    bus.emit('add', message);
  },
  clear: () => {
    // EventBus.$emit('clear');
    bus.emit('clear');
  },
};

export const messages = ref([]);

export const YartuNotifySymbol = Symbol();

export function useYartuNotify() {
    const yartuNotify = inject(YartuNotifySymbol);
    if (!yartuNotify) {
        throw new Error('Yartu UI Kit, No Snackbar provided!');
    }
    return yartuNotify;
};

export const YartuNotifyService = {
  init: (app) => {
    app.config.globalProperties.$yartuNotify = busFunctions;
    if (typeof window !== 'undefined') {
      window.$yartuNotify = busFunctions;
    }
    app.provide(YartuNotifySymbol, busFunctions); 
  },
};
