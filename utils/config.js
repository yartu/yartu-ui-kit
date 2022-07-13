let config = {
};

export { config as default };

export const setOptions = (options) => { config = options };

export const setVueInstance = (Vue) => { VueInstance = Vue };

export let VueInstance;
