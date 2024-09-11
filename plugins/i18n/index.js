import { ref, reactive, readonly, toRaw } from 'vue';
import { getMessage, isEmpty, mergeDeep, parseLocaleValues, replaceLocaleValues } from './utils';

export function createI18n(options) {
  const initOptions = Object.assign({ locale: 'en', fallbackLocale: 'en', messages: {} }, options);
  const current = ref(initOptions.locale);
  const locales = reactive({});
  Object.entries(initOptions.messages).forEach(([key, messages]) => {
    locales[key] = messages;
  });

  return {
    t(key, option) {
      if (!key) {
        return '';
      }

      const locale = typeof option === 'string' && option ? option : current.value;

      let message = getMessage(locales[locale], key) || getMessage(locales[initOptions.fallbackLocale], key);
      if (option && typeof option !== 'string') {
        const values = parseLocaleValues(message, option);
        if (!isEmpty(values)) {
          message = replaceLocaleValues(message, values);
        }
      }

      return message || key;
    },
    current: readonly(current),
    options: readonly(options || {}),

    changeLocale(locale) {
      current.value = locale;
    },
    setLocaleMessage(options) {
      if (options.messages) {
        locales[options.locale] = mergeDeep(toRaw(locales[options.locale] || {}), options.messages);
      }
    },
    getLocaleMessage(locale) {
      return locales[locale] || {};
    },
  };
}
