import { useEventBus } from '@vueuse/core';
import { inject, ref } from 'vue';
import YartuNotify from './YartuNotify.vue';

const bus = useEventBus('yartuNotify');

const busFunctions = {
  toast: (data) => {
    bus.emit('toast', data);
  },
  snackbar: (data) => {
    bus.emit('snackbar', data);
  },
  dialog: (data) => {
    bus.emit('dialog', data);
  },
  clear: () => {
    bus.emit('clear');
  },
};

const YartuNotifySymbol = Symbol();

export const messages = ref([]);


export function useYartuNotify() {
  const yartuNotify = inject(YartuNotifySymbol);
  if (!yartuNotify) {
    throw new Error('No Yartu Notify provided!');
  }
  return yartuNotify;
}

export const YartuNotifyService = {
  install: (app) => {
    app.config.globalProperties.$snackbar = busFunctions;
    if (typeof window !== 'undefined') {
      window.$snackbar = busFunctions;
    }
    app.provide(YartuNotifySymbol, busFunctions);
  },
};
