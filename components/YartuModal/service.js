import { useEventBus } from '@vueuse/core';
import { inject, shallowRef, reactive } from 'vue';

const YartuModalSymbol = Symbol();
const bus = useEventBus('yartuModal');

export const modals = reactive([]);

const busFunctions = {
  open: (instance, options = {}, closeCallBack = null) => {
    const modal = {
      options,
      dynamicComponent: shallowRef(instance),
      openModal: true,
      closeCallBack,
    };
    modals.push(modal);
  },
  clear: () => {
    modals.forEach((modal) => {
      modal.openModal = false;
    });
  },
  pop: () => {
    modals.pop()
  }
};

export function useYartuModal() {
    const yartuModal = inject(YartuModalSymbol);
    if (!yartuModal) {
      throw new Error('No Yartu Modal provided!');
    }
    return yartuModal;
}

export const closeModal = (modal, index, x) => {
  modal.openModal = false;
  modals.splice(index, 1);
  if (modal.closeCallBack) {
    modal.closeCallBack(modal);
  }
};

export const yartuModalservice = {
  install: (app) => {
    app.config.globalProperties.$yartuModal = busFunctions;
    if (typeof window !== 'undefined') {
      window.$yartuModal = busFunctions;
    }
    app.provide(YartuModalSymbol, busFunctions);
  },
};
