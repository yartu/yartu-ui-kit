import { useEventBus } from '@vueuse/core';
import { inject, shallowRef, reactive, computed } from 'vue';

const YartuModalSymbol = Symbol();
const bus = useEventBus('yartuModal');

export const modals = reactive([]);
export const activeModals = computed(() => modals.filter((m) => m.openModal));

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
    if (modals.length > 0) {
      modals[modals.length - 1].openModal = false;
    }
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
